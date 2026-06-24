const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/recipes
// @desc    Get all recipes (with optional search, category, and maxTime query params)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, maxTime } = req.query;
    let query = {};

    // 1. MongoDB Text Search
    if (search) {
      query.$text = { $search: search };
    }

    // 2. Category Filter (Case-insensitive match)
    if (category) {
      query.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }

    // 3. Maximum Cook Time Filter
    if (maxTime) {
      const parsedMaxTime = Number(maxTime);
      if (!isNaN(parsedMaxTime)) {
        query.cookTime = { $lte: parsedMaxTime };
      } else {
        return res.status(400).json({ message: 'maxTime parameter must be a valid number' });
      }
    }

    let findQuery = Recipe.find(query).populate('author', 'name email');

    // If text searching, sort by text search relevance score
    if (search) {
      findQuery = findQuery
        .select({ score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } });
    } else {
      // Otherwise sort by creation date (newest first)
      findQuery = findQuery.sort({ createdAt: -1 });
    }

    const recipes = await findQuery.exec();
    res.json(recipes);
  } catch (err) {
    console.error('Get recipes error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/recipes/my-recipes
// @desc    Get logged in user's recipes
// @access  Private
router.get('/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error('Get my-recipes error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/recipes/favourites
// @desc    Get logged in user's favourite recipes
// @access  Private
router.get('/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: 'favourites',
      populate: {
        path: 'author',
        select: 'name email',
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favourites.filter(Boolean));
  } catch (err) {
    console.error('Get favourites error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/recipes/:id/favourite
// @desc    Toggle favourite status of a recipe
// @access  Private
router.post('/:id/favourite', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const index = user.favourites.indexOf(recipe._id);
    if (index > -1) {
      user.favourites.splice(index, 1);
    } else {
      user.favourites.push(recipe._id);
    }

    await user.save();
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error('Toggle favourite error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name email');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error('Get recipe by ID error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/recipes
// @desc    Create a new recipe
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, ingredients, steps, category, cookTime, imageUrl, youtubeUrl, tags } = req.body;

  // Simple validation
  if (!title || !description || !ingredients || !steps || !category || cookTime === undefined) {
    return res.status(400).json({ message: 'Please enter all required fields' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      category,
      cookTime,
      imageUrl,
      youtubeUrl,
      tags,
      author: req.user, // Attached by auth middleware
    });

    const savedRecipe = await newRecipe.save();
    
    // Populate author info before returning
    const populatedRecipe = await Recipe.findById(savedRecipe._id).populate('author', 'name email');
    
    res.status(201).json(populatedRecipe);
  } catch (err) {
    console.error('Create recipe error:', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update an existing recipe
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, ingredients, steps, category, cookTime, imageUrl, youtubeUrl, tags } = req.body;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Make sure user owns recipe
    if (recipe.author.toString() !== req.user) {
      return res.status(403).json({ message: 'User not authorized to update this recipe' });
    }

    // Update fields
    if (title !== undefined) recipe.title = title;
    if (description !== undefined) recipe.description = description;
    if (ingredients !== undefined) recipe.ingredients = ingredients;
    if (steps !== undefined) recipe.steps = steps;
    if (category !== undefined) recipe.category = category;
    if (cookTime !== undefined) recipe.cookTime = cookTime;
    if (imageUrl !== undefined) recipe.imageUrl = imageUrl;
    if (youtubeUrl !== undefined) recipe.youtubeUrl = youtubeUrl;
    if (tags !== undefined) recipe.tags = tags;

    const updatedRecipe = await recipe.save();
    const populatedRecipe = await Recipe.findById(updatedRecipe._id).populate('author', 'name email');

    res.json(populatedRecipe);
  } catch (err) {
    console.error('Update recipe error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Make sure user owns recipe
    if (recipe.author.toString() !== req.user) {
      return res.status(403).json({ message: 'User not authorized to delete this recipe' });
    }

    await recipe.deleteOne();

    res.json({ message: 'Recipe removed successfully' });
  } catch (err) {
    console.error('Delete recipe error:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
