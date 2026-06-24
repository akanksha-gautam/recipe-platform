const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const recipesData = [
  {
    title: "Classic Butter Chicken",
    description: "Creamy, rich, and delicious restaurant-style butter chicken made at home.",
    category: "Indian",
    cookTime: 45,
    ingredients: [
      "800g Chicken thighs or breasts, cut into bite-sized pieces",
      "1 cup Plain yogurt",
      "2 tbsp Ginger-garlic paste",
      "1 tbsp Garam masala",
      "1 tsp Kashmiri red chili powder",
      "50g Butter",
      "1 large Onion, finely chopped",
      "1 can (400g) Tomato puree",
      "1 cup Heavy cream",
      "1 tbsp Dried fenugreek leaves (Kasuri Methi)",
      "Salt to taste"
    ],
    steps: [
      "In a bowl, mix chicken with yogurt, half of the ginger-garlic paste, garam masala, Kashmiri red chili powder, and salt. Marinate for at least 1 hour.",
      "Heat a pan with a tablespoon of oil and cook the chicken pieces in batches until lightly charred and cooked through. Set aside.",
      "In the same pan, melt half of the butter. Add the chopped onions and cook until soft and translucent.",
      "Add the remaining ginger-garlic paste and sauté for 1 minute. Pour in the tomato puree and let it simmer for 10 minutes.",
      "Blend the sauce until completely smooth, then return it to the pan.",
      "Add the cooked chicken, remaining butter, and heavy cream. Simmer on low heat for 5-7 minutes.",
      "Crush dried fenugreek leaves between your palms and sprinkle over the curry. Cook for another minute and serve hot with Naan."
    ],
    tags: ["chicken", "butter chicken", "indian", "curry", "creamy"],
    youtubeUrl: "https://youtu.be/dfbb1ZTJTB8?si=co0w8Ix6c9HtuC7J"
  },

  {
    title: "Soft Garlic Naan",
    description: "Soft, pillowy Indian flatbread topped with minced garlic and butter, cooked on a stovetop cast-iron skillet.",
    category: "Indian",
    cookTime: 30,
    ingredients: [
      "3 cups All-purpose flour",
      "1 tsp Instant yeast",
      "1 tsp Sugar",
      "1/2 cup Warm water",
      "1/2 cup Plain yogurt",
      "2 tbsp Oil",
      "1 tsp Salt",
      "4 tbsp Melted butter",
      "3 tbsp Garlic, finely minced",
      "2 tbsp Cilantro, chopped"
    ],
    steps: [
      "In a small cup, dissolve sugar and yeast in warm water. Let it sit for 5 minutes until frothy.",
      "In a large bowl, mix flour and salt. Add the yeast mixture, yogurt, oil, and knead into a soft, smooth dough. Add extra water if needed.",
      "Cover dough with a damp cloth and let it rise in a warm place for 1 hour.",
      "Divide the dough into 8 equal portions. Roll each portion into a teardrop shape about 1/4 inch thick.",
      "Press minced garlic and chopped cilantro firmly onto one side of the rolled naan.",
      "Brush the other side of the naan with water and place it wet-side down onto a smoking hot cast-iron skillet (tawa).",
      "When bubbles form, flip the skillet upside down over a direct flame to char the garlic side for 1-2 minutes.",
      "Remove naan from skillet and brush generously with melted butter."
    ],
    tags: ["naan", "bread", "indian", "garlic", "vegetarian"],
    youtubeUrl: "https://youtu.be/K-4TrsOxQUI?si=_jzm01XFJllq1yOH"
  },
  {
    title: "Hyderabadi Chicken Biryani",
    description: "Layered and aromatic long-grain basmati rice cooked on 'dum' with spiced chicken, fresh mint, and saffron.",
    category: "Indian",
    cookTime: 60,
    ingredients: [
      "1kg Basmati rice, washed and soaked for 30 minutes",
      "1kg Chicken pieces",
      "1 cup Plain yogurt",
      "1 cup Fried onions (birista)",
      "1/2 cup Fresh mint leaves, chopped",
      "1/2 cup Fresh coriander leaves, chopped",
      "2 tbsp Biryani masala powder",
      "1 tsp Saffron threads soaked in 1/4 cup warm milk",
      "3 tbsp Ghee",
      "Whole spices (cardamom, cinnamon, cloves, bay leaves)"
    ],
    steps: [
      "Marinate chicken with yogurt, half of the fried onions, mint, coriander, biryani masala, ginger-garlic paste, and salt. Set aside for 2 hours.",
      "Boil water in a large pot with whole spices and salt. Add soaked basmati rice and cook until it is 70% done. Drain and set rice aside.",
      "In a heavy-bottomed pot, place the marinated chicken at the bottom.",
      "Layer the parboiled rice over the chicken. Sprinkle the remaining fried onions, chopped mint, coriander, ghee, and saffron milk on top.",
      "Seal the pot with dough or aluminum foil and cover with a tight lid to trap steam.",
      "Cook on medium heat for 10 minutes, then place a flat griddle under the pot and cook on low heat (dum) for another 35-40 minutes.",
      "Let it rest for 10 minutes before gently fluffing the rice and serving with raita."
    ],
    tags: ["biryani", "rice", "indian", "chicken", "aromatic"],
    youtubeUrl: "https://youtu.be/aleED1mc5kI?si=NjaQ0BtrC2U2erSb"
  },
  {
    title: "Classic Margherita Pizza",
    description: "Classic Neapolitan style pizza with thin crust, fresh mozzarella cheese, rich tomato sauce, and aromatic basil leaves.",
    category: "Italian",
    cookTime: 25,
    ingredients: [
      "1 Pizza dough ball (store-bought or homemade)",
      "1/2 cup San Marzano crushed tomatoes",
      "150g Fresh mozzarella cheese, sliced or torn",
      "6-8 Fresh basil leaves",
      "1 tbsp Extra virgin olive oil",
      "Pinch of salt"
    ],
    steps: [
      "Preheat your oven to its maximum temperature (around 500°F / 260°C). If using a pizza stone, preheat it as well.",
      "Roll out or stretch the pizza dough on a floured surface to form a 12-inch circle.",
      "Spread the crushed tomatoes evenly over the dough, leaving a 1/2-inch border around the edges.",
      "Sprinkle a pinch of salt over the sauce, then arrange the fresh mozzarella cheese slices on top.",
      "Drizzle extra virgin olive oil over the cheese and tomatoes.",
      "Bake in the preheated oven for 10-12 minutes (or 5-7 minutes on a pizza stone) until the crust is golden and charred, and cheese is bubbly.",
      "Scatter fresh basil leaves immediately over the hot pizza right before serving."
    ],
    tags: ["pizza", "italian", "cheese", "basil", "vegetarian"],
    youtubeUrl: "https://www.youtube.com/watch?v=1-SJGQ2HLp8"
  },
  {
    title: "Spaghetti Carbonara",
    description: "Traditional Roman pasta dish made with eggs, hard cheese, cured pork guanciale, and lots of freshly cracked black pepper.",
    category: "Italian",
    cookTime: 20,
    ingredients: [
      "350g Spaghetti",
      "150g Guanciale or Pancetta, diced",
      "4 large Egg yolks + 1 whole egg",
      "1 cup Pecorino Romano or Parmesan cheese, freshly grated",
      "1 tbsp Freshly cracked black pepper",
      "Salt to taste"
    ],
    steps: [
      "Bring a large pot of salted water to a boil and cook the spaghetti until al dente.",
      "While pasta cooks, cook the diced guanciale in a large skillet over medium heat until crispy and fat is rendered. Remove skillet from heat.",
      "In a bowl, whisk together the egg yolks, whole egg, grated Pecorino Romano cheese, and black pepper to form a thick paste.",
      "Drain the spaghetti, reserving 1 cup of pasta water.",
      "Add the hot spaghetti directly to the skillet with the guanciale and toss to combine.",
      "Pour the egg and cheese mixture over the pasta. Quickly toss and stir, adding splashes of reserved pasta water as needed to create a smooth, creamy sauce without scrambling the eggs.",
      "Serve immediately with extra grated cheese and black pepper."
    ],
    tags: ["pasta", "italian", "spaghetti", "carbonara", "classic"],
    youtubeUrl: "https://youtu.be/D_2DBLAt57c?si=TPPVTw3JKFNyfSIO"
  },
  {
    title: "Cheesy Meat Lasagna",
    description: "A rich and layered pasta casserole featuring a savory ground beef bolognese sauce, creamy béchamel, and lots of melted cheese.",
    category: "Italian",
    cookTime: 75,
    ingredients: [
      "12 Lasagna pasta sheets",
      "500g Ground beef",
      "1 can (400g) Crushed tomatoes",
      "1 onion and 3 cloves garlic, minced",
      "2 cups Ricotta or cottage cheese",
      "3 cups Mozzarella cheese, shredded",
      "1/2 cup Parmesan cheese, grated",
      "For Bechamel: 3 tbsp butter, 3 tbsp flour, 2.5 cups milk",
      "Italian seasoning, salt, and pepper"
    ],
    steps: [
      "Brown the ground beef with onions and garlic in a pan. Add crushed tomatoes, Italian seasoning, salt, and pepper. Simmer for 20 minutes to make the meat sauce.",
      "Make the béchamel: Melt butter in a saucepan, whisk in flour, and cook for 1 minute. Gradually pour in milk, whisking constantly until the sauce thickens.",
      "Boil lasagna sheets according to package instructions and drain.",
      "Preheat oven to 375°F (190°C).",
      "In a 9x13 baking dish, layer meat sauce, lasagna sheets, béchamel, ricotta, and mozzarella. Repeat layers, finishing with lasagna sheets covered in meat sauce, béchamel, and mozzarella.",
      "Cover with foil and bake for 25 minutes. Remove foil and bake for another 20 minutes until golden brown and bubbly.",
      "Let lasagna rest for 15 minutes before slicing."
    ],
    tags: ["lasagna", "italian", "pasta", "cheese", "beef", "comfort-food"],
    youtubeUrl: "https://youtu.be/fVDsTP-pTXs?si=Dbl6StgO-ueEGL33"
  },
  {
    title: "Kung Pao Chicken",
    description: "A classic Szechuan stir-fry dish with tender chicken cubes, crunchy peanuts, and spicy red chilies tossed in a savory glaze.",
    category: "Chinese",
    cookTime: 25,
    ingredients: [
      "500g Chicken breast, cut into 1-inch cubes",
      "1/2 cup Unsalted roasted peanuts",
      "1 Bell pepper, diced",
      "6-8 Dried red chilies",
      "2 tbsp Soy sauce",
      "1 tbsp Chinese black vinegar",
      "1 tbsp Shaoxing wine or dry sherry",
      "1 tsp Sichuan peppercorns, crushed",
      "3 cloves Garlic and 1 inch Ginger, sliced",
      "1 tbsp Cornstarch"
    ],
    steps: [
      "Marinate chicken with 1 tablespoon of soy sauce, Shaoxing wine, and cornstarch for 15 minutes.",
      "In a small bowl, whisk together the remaining soy sauce, vinegar, sugar, sesame oil, and a splash of water to prepare the stir-fry sauce.",
      "Heat oil in a wok over high heat. Add the chicken cubes and sear until lightly golden. Remove and set aside.",
      "Add a bit more oil to the wok, lower heat, and add dried red chilies and crushed Sichuan peppercorns. Fry until fragrant.",
      "Add sliced garlic, ginger, and diced bell peppers. Sauté for 2 minutes.",
      "Return the chicken to the wok along with the peanuts.",
      "Pour in the prepared sauce. Toss everything rapidly on high heat until the sauce thickens and coats the chicken. Serve with rice."
    ],
    tags: ["chinese", "chicken", "stir-fry", "spicy", "peanuts"],
    youtubeUrl: "https://youtu.be/0eyCiHtH0mk?si=5WUnb4HMojSf34eQ"
  },
  {
    title: "Restaurant Style Egg Fried Rice",
    description: "Quick, fluffy, and savory Chinese takeout-style fried rice loaded with scrambled eggs, green onions, and fresh vegetables.",
    category: "Chinese",
    cookTime: 15,
    ingredients: [
      "4 cups Jasmine rice, cooked and chilled overnight",
      "3 Eggs, whisked",
      "1 cup Mixed peas and carrots",
      "4 Green onions, chopped",
      "2 tbsp Soy sauce",
      "1 tbsp Sesame oil",
      "2 cloves Garlic, minced",
      "White pepper to taste"
    ],
    steps: [
      "Heat a tablespoon of oil in a large wok over medium-high heat. Pour in the whisked eggs and scramble until soft. Remove and set aside.",
      "Heat another tablespoon of oil in the wok. Sauté minced garlic and the white parts of green onions for 30 seconds.",
      "Add the peas and carrots and stir-fry for 2 minutes.",
      "Turn the heat up to maximum. Add the cold rice, breaking up any large clumps.",
      "Drizzle soy sauce and sesame oil over the rice. Stir-fry constantly for 3-4 minutes until the rice gets slightly toasted.",
      "Add the scrambled eggs and green parts of the onions back into the wok.",
      "Season with a pinch of white pepper, toss everything together for 1 final minute, and serve hot."
    ],
    tags: ["rice", "fried-rice", "chinese", "egg", "easy", "quick"],
    youtubeUrl: "https://youtu.be/qtOgdXXdWDA?si=lmQd81NVtd5OcWOw"
  },
  {
    title: "Sweet and Sour Chicken",
    description: "Crispy battered chicken chunks tossed in a sweet, sour, and tangy red glaze along with bell peppers and pineapple slices.",
    category: "Chinese",
    cookTime: 30,
    ingredients: [
      "500g Chicken breasts, cut into chunks",
      "1 Egg, beaten",
      "1/2 cup Cornstarch + 1/2 cup flour",
      "1 Bell pepper, cut into chunks",
      "1/2 cup Pineapple chunks",
      "1/2 cup Ketchup",
      "1/3 cup Apple cider vinegar",
      "1/3 cup Sugar",
      "1 tbsp Soy sauce",
      "Oil for frying"
    ],
    steps: [
      "In a bowl, whisk ketchup, vinegar, sugar, soy sauce, and 1 teaspoon of cornstarch to make the sweet and sour sauce glaze.",
      "Dip chicken pieces in beaten egg, then dredge in the cornstarch and flour mixture until well coated.",
      "Heat oil in a deep pan and fry the chicken chunks in batches for 5-6 minutes until crispy and golden brown. Drain on paper towels.",
      "In a clean wok, sauté bell peppers and pineapple chunks for 2 minutes.",
      "Pour in the sweet and sour sauce and bring to a simmer until bubbly.",
      "Add the fried chicken pieces to the wok and toss quickly so that all the chicken is coated in the sticky glaze. Serve immediately."
    ],
    tags: ["chinese", "chicken", "sweet-and-sour", "pineapple", "crispy"],
    youtubeUrl: "https://youtu.be/W4BNXVYZaf0?si=gwNUTmTY1cZz-U-B"
  },
  {
    title: "Tacos Al Pastor",
    description: "Famous Mexican street tacos featuring tender pork shoulder marinated in guajillo chilies, spices, and charred pineapple slices.",
    category: "Mexican",
    cookTime: 40,
    ingredients: [
      "1kg Pork shoulder, thinly sliced",
      "3 Guajillo chilies, seeds removed",
      "2 tbsp Achiote paste",
      "1/2 cup Pineapple juice",
      "1/4 cup White vinegar",
      "3 cloves Garlic",
      "1 cup Fresh pineapple slices",
      "Corn tortillas",
      "Onion, cilantro, and lime wedges for garnish"
    ],
    steps: [
      "Boil guajillo chilies in water for 10 minutes until soft. Drain.",
      "Blend soft chilies, achiote paste, pineapple juice, vinegar, garlic, oregano, cumin, and salt until smooth.",
      "Pour marinade over sliced pork. Cover and refrigerate for at least 4 hours (overnight is best).",
      "Heat a grill pan or outdoor grill. Cook the marinated pork slices in batches until charred on the edges and cooked through.",
      "Grill pineapple slices until caramelized, then chop them into small pieces.",
      "Chop the cooked pork into bite-sized street taco portions.",
      "Warm corn tortillas, layer with chopped pork, grilled pineapple, finely diced onion, fresh cilantro, and a squeeze of lime juice."
    ],
    tags: ["tacos", "mexican", "pork", "pineapple", "street-food"],
    youtubeUrl: "https://youtu.be/oLPMy-GmNtw?si=X9p5UQy6Z14oql67"
  },
  {
    title: "Fresh Guacamole",
    description: "Simple, healthy, and authentic Mexican guacamole made from ripe avocados, fresh lime juice, onions, and tomatoes.",
    category: "Mexican",
    cookTime: 10,
    ingredients: [
      "3 Ripe Avocados",
      "1 Lime, juiced",
      "1 Roma tomato, diced",
      "1/2 cup Red onion, finely chopped",
      "1/4 cup Fresh cilantro, chopped",
      "1 Jalapeno, seeded and minced",
      "1/2 tsp Salt"
    ],
    steps: [
      "Cut the avocados in half, remove the pits, and scoop the flesh into a medium bowl.",
      "Use a fork or potato masher to gently mash the avocados to your desired consistency, leaving some chunky pieces.",
      "Add the lime juice and salt immediately to keep the avocado green.",
      "Stir in the chopped red onion, diced tomato, minced jalapeno, and fresh cilantro.",
      "Taste and adjust salt or lime juice if necessary. Serve with tortilla chips."
    ],
    tags: ["guacamole", "mexican", "avocado", "snack", "vegan", "healthy"],
    youtubeUrl: "https://youtu.be/a6yCQdx3Pkg?si=Ov8LIRuYu9RejGg3"
  },
  {
    title: "Cheesy Chicken Quesadilla",
    description: "Crispy grilled flour tortillas folded around melted Monterey Jack and cheddar cheeses and seasoned shredded chicken.",
    category: "Mexican",
    cookTime: 20,
    ingredients: [
      "4 Large flour tortillas",
      "2 cups Cooked chicken, shredded",
      "2 cups shredded cheese (cheddar & Monterey Jack)",
      "1 Bell pepper, thinly sliced",
      "1/2 onion, thinly sliced",
      "1 tbsp Taco seasoning",
      "2 tbsp Butter"
    ],
    steps: [
      "In a skillet, sauté sliced bell peppers and onions with a tablespoon of oil until soft. Add shredded chicken and taco seasoning. Toss for 2 minutes, then remove from pan.",
      "Clean skillet and melt a teaspoon of butter over medium heat.",
      "Place one flour tortilla in the skillet. Sprinkle a handful of cheese over the entire tortilla.",
      "Spread half of the chicken and pepper mixture over one half of the tortilla.",
      "When the cheese starts melting, fold the tortilla in half over the chicken filling.",
      "Cook until the bottom is crispy and golden, then flip to toast the other side.",
      "Repeat with remaining tortillas, cut into wedges, and serve with salsa and sour cream."
    ],
    tags: ["mexican", "quesadilla", "chicken", "cheese", "quick"],
    youtubeUrl: "https://youtu.be/GoMQYIVoNsk?si=CBcE91aNWE7EqZqg"
  },
  {
    title: "Molten Chocolate Lava Cake",
    description: "Decadent single-serving chocolate cakes with a rich, molten chocolate center that flows out when cut open.",
    category: "Desserts",
    cookTime: 20,
    ingredients: [
      "100g High-quality semi-sweet chocolate, chopped",
      "1/2 cup Butter",
      "2 whole Eggs + 2 Egg yolks",
      "1/4 cup Sugar",
      "1 tsp Vanilla extract",
      "3 tbsp All-purpose flour",
      "Pinch of salt"
    ],
    steps: [
      "Preheat your oven to 425°F (218°C). Grease four 6-ounce ramekins with butter and dust lightly with cocoa powder.",
      "In a microwave-safe bowl, melt the chopped chocolate and butter in 30-second increments until completely smooth.",
      "In a separate bowl, whisk whole eggs, egg yolks, sugar, vanilla extract, and salt until thick and pale yellow.",
      "Gently fold the melted chocolate mixture and flour into the whipped eggs until just combined.",
      "Divide the batter evenly among the prepared ramekins.",
      "Bake at 425°F for 12-14 minutes. The edges should be firm and set, but the centers should still be soft and jiggle.",
      "Let cool for 1 minute, invert onto dessert plates, and dust with powdered sugar."
    ],
    tags: ["dessert", "chocolate", "cake", "baking", "sweet"],
    youtubeUrl: "https://youtu.be/Yrl_ZaKLIO0?si=oldWDQuuQaGyVTFs"
  },
  {
    title: "Chewy Chocolate Chip Cookies",
    description: "The ultimate chocolate chip cookie recipe - crispy golden edges, chewy centers, and loaded with melted chocolate chips.",
    category: "Desserts",
    cookTime: 25,
    ingredients: [
      "1 cup Unsalted butter, melted and cooled slightly",
      "3/4 cup Brown sugar, packed",
      "3/4 cup White granulated sugar",
      "2 large Eggs",
      "2 tsp Vanilla extract",
      "2.25 cups All-purpose flour",
      "1 tsp Baking soda",
      "2 cups Semi-sweet chocolate chips",
      "1/2 tsp Sea salt"
    ],
    steps: [
      "In a large bowl, whisk the melted butter, brown sugar, and white sugar together until no lumps remain.",
      "Whisk in the eggs one at a time, followed by the vanilla extract, until the mixture is smooth and slightly pale.",
      "Fold in the flour, baking soda, and salt with a spatula until just combined (do not overmix).",
      "Fold in the chocolate chips.",
      "Cover dough and chill in the refrigerator for at least 30 minutes (chilling makes cookies thicker and chewier).",
      "Preheat oven to 350°F (175°C) and line baking sheets with parchment paper.",
      "Scoop round balls of dough onto baking sheets, spacing them 2 inches apart.",
      "Bake for 9-11 minutes until the edges are golden brown but the centers are still soft. Let them cool on the sheet for 5 minutes before transferring."
    ],
    tags: ["cookies", "dessert", "chocolate", "baking", "chewy"],
    youtubeUrl: "https://youtu.be/Y36OS7TgY8s?si=PItpSdu7EfuI4sUI"
  },
  {
    title: "Classic Homemade Apple Pie",
    description: "A perfect holiday dessert featuring a flaky, buttery double crust filled with sweet cinnamon-spiced sliced apples.",
    category: "Desserts",
    cookTime: 70,
    ingredients: [
      "2 Butter pie crust sheets (homemade or store-bought)",
      "6-7 Tart cooking apples (like Granny Smith), peeled and sliced",
      "1/2 cup Sugar",
      "1/2 cup Brown sugar",
      "3 tbsp All-purpose flour",
      "1 tsp Ground cinnamon",
      "1/4 tsp Ground nutmeg",
      "1 tbsp Lemon juice",
      "1 Egg + 1 tbsp water (for egg wash)"
    ],
    steps: [
      "In a large bowl, toss the peeled and sliced apples with lemon juice, white sugar, brown sugar, flour, cinnamon, and nutmeg. Let sit for 15 minutes.",
      "Preheat your oven to 400°F (200°C).",
      "Roll out one pie crust sheet and drape it over a 9-inch pie dish. Press it gently into the bottom and sides.",
      "Mound the spiced apple mixture inside the crust, leaving any excess liquid behind in the bowl.",
      "Roll out the second pie crust sheet and place it over the apples. Trim and crimp the edges together to seal.",
      "Cut 4-5 slits in the top crust to allow steam to escape.",
      "Brush the top crust with egg wash and bake for 50-60 minutes until the crust is golden brown and the apple filling is bubbling through the slits. Let cool before slicing."
    ],
    tags: ["apple-pie", "pie", "dessert", "apple", "baking", "comfort-food"],
    youtubeUrl: "https://youtu.be/Ce2sB4v3Ihk?si=ImjfgwAIYdTOqwT7"
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('Error: MONGODB_URI is not defined in the environment variables.');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB database successfully.');

    // Clear existing data
    console.log('Clearing old recipes...');
    await Recipe.deleteMany({});

    // Check if demo user already exists
    let demoUser = await User.findOne({ email: 'demo@recipe.com' });
    if (demoUser) {
      console.log('Demo user already exists. Updating details...');
      demoUser.name = 'Demo Chef';
      demoUser.bio = 'Passionate chef and recipe collector who loves exploring culinary traditions around the world.';
      demoUser.profilePhoto = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300';
      await demoUser.save();
    } else {
      console.log('Creating demo user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('demo123', salt);
      demoUser = new User({
        name: 'Demo Chef',
        email: 'demo@recipe.com',
        password: hashedPassword,
        bio: 'Passionate chef and recipe collector who loves exploring culinary traditions around the world.',
        profilePhoto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300',
        favourites: []
      });
      await demoUser.save();
      console.log('Demo user created successfully.');
    }

    // Insert 15 recipes referencing demoUser._id as author
    const preparedRecipes = recipesData.map(recipe => ({
      ...recipe,
      author: demoUser._id
    }));

    console.log('Seeding 15 recipes...');
    const insertedRecipes = await Recipe.insertMany(preparedRecipes);
    console.log(`Successfully seeded ${insertedRecipes.length} recipes!`);

    console.log('Database seeding complete!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDB();
