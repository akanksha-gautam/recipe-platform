const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Recipe description is required'],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A recipe must have at least one ingredient',
      },
    },
    steps: {
      type: [String],
      required: [true, 'Steps are required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A recipe must have at least one step',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    cookTime: {
      type: Number,
      required: [true, 'Cook time is required'],
      min: [0, 'Cook time cannot be negative'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    youtubeUrl: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

// Create compound text index on title, description, and tags for text search
RecipeSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Recipe', RecipeSchema);
