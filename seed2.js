const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const newRecipesData = [
  // Breakfast (4 recipes)
  {
    title: "Masala Omelette",
    description: "A classic spicy Indian breakfast omelette packed with finely chopped onions, green chilies, tomatoes, and fresh coriander.",
    category: "Breakfast",
    cookTime: 10,
    ingredients: [
      "3 large Eggs",
      "1/2 Onion, finely chopped",
      "1/2 Tomato, chopped",
      "1 Green chili, minced",
      "2 tbsp Fresh coriander, chopped",
      "1/4 tsp Turmeric powder",
      "1/2 tsp Red chili powder",
      "1 tbsp Butter",
      "Salt to taste"
    ],
    steps: [
      "In a bowl, crack the eggs and whisk them vigorously until frothy.",
      "Add the chopped onions, tomatoes, green chilies, and coriander leaves to the bowl.",
      "Stir in the turmeric powder, red chili powder, and salt, mixing well with a fork.",
      "Melt butter in a non-stick skillet over medium-high heat.",
      "Pour in the egg mixture and tilt the pan to spread it evenly.",
      "Cook for 2-3 minutes until the bottom is golden and set. Flip carefully and cook the other side for another 1-2 minutes.",
      "Fold in half and serve hot with toasted bread."
    ],
    tags: ["eggs", "breakfast", "indian", "spicy", "omelette"],
    youtubeUrl: "https://www.youtube.com/watch?v=a7NtNxzROpI"
  },
  {
    title: "Puffy Indian Bhatura",
    description: "Deep-fried, puffy, and soft leavened flatbread that is traditional to North Indian cuisine, best paired with spicy Chole.",
    category: "Breakfast",
    cookTime: 20,
    ingredients: [
      "2 cups All-purpose flour (Maida)",
      "2 tbsp Semolina (Sooji)",
      "1/4 cup Plain yogurt",
      "1/2 tsp Baking powder",
      "1 tsp Sugar",
      "1 tbsp Oil (plus extra for deep frying)",
      "Warm water as needed",
      "Salt to taste"
    ],
    steps: [
      "In a large mixing bowl, combine flour, semolina, baking powder, sugar, and salt.",
      "Add the yogurt and 1 tablespoon of oil. Mix well with your fingertips.",
      "Gradually add warm water and knead into a smooth, elastic dough.",
      "Cover with a damp cloth and let it rest in a warm place for 2 hours.",
      "Divide the dough into equal portions and roll them into smooth balls.",
      "Roll each ball into an oval shape about 1/8 inch thick.",
      "Heat a large quantity of oil in a deep pan. The oil must be very hot.",
      "Carefully slide the rolled bhatura into the hot oil. Gently press down with a slotted spoon so it puffs up.",
      "Flip and fry until both sides are light golden brown. Drain on paper towels and serve hot."
    ],
    tags: ["bhatura", "bread", "indian", "breakfast", "fried"],
    youtubeUrl: "https://www.youtube.com/watch?v=kA_3gY9rX4Y"
  },
  {
    title: "Healthy Avocado Toast",
    description: "Toasted sourdough bread topped with creamy mashed avocado, cherry tomatoes, microgreens, and a drizzle of olive oil.",
    category: "Breakfast",
    cookTime: 12,
    ingredients: [
      "2 thick slices of Sourdough bread",
      "1 ripe Avocado",
      "1/2 Lemon, juiced",
      "1/2 cup Cherry tomatoes, halved",
      "1 tbsp Extra virgin olive oil",
      "Pinch of red pepper flakes",
      "Fresh microgreens or parsley for garnish",
      "Salt and black pepper to taste"
    ],
    steps: [
      "Toast the sourdough bread slices until golden brown and crispy.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Add lemon juice, salt, and black pepper, then mash with a fork to your desired consistency.",
      "Spread the mashed avocado generously over the toasted bread slices.",
      "Top with cherry tomato halves and garnish with fresh microgreens.",
      "Drizzle extra virgin olive oil and sprinkle red pepper flakes on top before serving."
    ],
    tags: ["avocado", "toast", "breakfast", "healthy", "vegan"],
    youtubeUrl: "https://www.youtube.com/watch?v=TxeAqu8lwJo"
  },
  {
    title: "Dalgona Whipped Coffee & Toast",
    description: "The viral whipped coffee drink served over cold milk, accompanied by a side of sweet cinnamon butter toast.",
    category: "Breakfast",
    cookTime: 15,
    ingredients: [
      "2 tbsp Instant coffee powder",
      "2 tbsp Sugar",
      "2 tbsp Hot water",
      "1.5 cups Milk (cold or hot)",
      "2 slices of Toast",
      "1 tbsp Butter",
      "1/2 tsp Cinnamon powder"
    ],
    steps: [
      "In a medium bowl, combine the instant coffee, sugar, and hot water.",
      "Using a hand mixer or whisk, beat the mixture vigorously until it turns thick, frothy, and holds soft peaks.",
      "Pour cold milk into a serving glass and fill with ice cubes if desired.",
      "Spoon the whipped coffee foam gently over the top of the milk.",
      "Toast your bread slices, spread butter, and sprinkle cinnamon powder on top.",
      "Serve the Dalgona coffee alongside the hot cinnamon toast."
    ],
    tags: ["coffee", "breakfast", "beverage", "sweet", "toast"],
    youtubeUrl: "https://www.youtube.com/watch?v=9SjCEOWd3PU"
  },

  // Appetizers (4 recipes)
  {
    title: "Restaurant-Style Paneer Tikka",
    description: "Marinated cubes of paneer, bell peppers, and onions skewered and cooked to charred perfection in an oven or grill pan.",
    category: "Appetizers",
    cookTime: 35,
    ingredients: [
      "400g Paneer (Cottage cheese), cubed",
      "1 Bell pepper, cut into 1-inch squares",
      "1 Onion, cut into 1-inch squares",
      "1/2 cup Greek yogurt",
      "1 tbsp Ginger-garlic paste",
      "1 tbsp Mustard oil",
      "1 tsp Kashmiri red chili powder",
      "1 tsp Garam masala",
      "1/2 tsp Kasuri methi",
      "Salt to taste"
    ],
    steps: [
      "In a large bowl, whisk the yogurt, mustard oil, ginger-garlic paste, red chili powder, garam masala, kasuri methi, and salt.",
      "Add the paneer cubes, bell pepper, and onion pieces. Gently toss to coat them evenly with the marinade.",
      "Cover and refrigerate for 30-45 minutes.",
      "Preheat your oven or grill pan to 400°F (200°C).",
      "Thread the marinated paneer, peppers, and onions alternately onto skewers.",
      "Bake or grill for 15-20 minutes, turning halfway, until the edges are nicely charred.",
      "Squeeze fresh lemon juice on top and serve hot with mint chutney."
    ],
    tags: ["paneer", "indian", "appetizer", "vegetarian", "grill"],
    youtubeUrl: "https://www.youtube.com/watch?v=a03U45jFxOI"
  },
  {
    title: "Tawa Garlic Butter Naan Bites",
    description: "Bite-sized pieces of stovetop garlic naan brushed with melted garlic herb butter, perfect as a party starter.",
    category: "Appetizers",
    cookTime: 25,
    ingredients: [
      "2 cups All-purpose flour",
      "1/2 tsp Baking soda",
      "1/2 cup Plain yogurt",
      "3 tbsp Melted butter",
      "2 tbsp Minced garlic",
      "2 tbsp Fresh cilantro, chopped",
      "Warm water for kneading"
    ],
    steps: [
      "Mix flour, baking soda, and salt. Add yogurt and knead into a soft dough. Let it rest for 30 minutes.",
      "Mix melted butter, minced garlic, and chopped cilantro in a small bowl to make garlic butter.",
      "Roll dough into small mini rounds about 3 inches in diameter.",
      "Cook each mini naan on a hot skillet (tawa) on one side until bubbles appear, then flip.",
      "Brush the top side generously with the garlic butter mixture.",
      "Serve warm as a bite-sized appetizer."
    ],
    tags: ["naan", "appetizer", "indian", "garlic", "vegetarian"],
    youtubeUrl: "https://www.youtube.com/watch?v=nZAwAYJVA5w"
  },
  {
    title: "Crispy Chicken Tikka Skewers",
    description: "Bite-sized chicken breasts marinated in spiced yogurt and grilled until juicy with a crispy charred exterior.",
    category: "Appetizers",
    cookTime: 30,
    ingredients: [
      "500g Chicken breast, cut into cubes",
      "1/2 cup Plain yogurt",
      "1.5 tbsp Ginger-garlic paste",
      "1 tbsp Lemon juice",
      "1 tbsp Tandoori masala",
      "1 tsp Kashmiri red chili powder",
      "1 tbsp Oil",
      "Salt to taste"
    ],
    steps: [
      "Marinate chicken cubes with yogurt, lemon juice, ginger-garlic paste, tandoori masala, red chili powder, oil, and salt.",
      "Refrigerate for at least 1 hour.",
      "Preheat the oven or a grill pan.",
      "Thread the marinated chicken cubes onto wooden skewers.",
      "Grill for 12-15 minutes, turning occasionally, until the chicken is cooked through and slightly charred on the edges."
    ],
    tags: ["chicken", "tikka", "appetizer", "indian", "spicy"],
    youtubeUrl: "https://www.youtube.com/watch?v=Hj_n77QoEKE"
  },
  {
    title: "Cheesy Quesadilla Dippers",
    description: "Crispy flour tortillas packed with melted cheddar and mozzarella cheese, cut into thin strips for easy dipping in salsa.",
    category: "Appetizers",
    cookTime: 15,
    ingredients: [
      "4 small Flour tortillas",
      "1 cup Mozzarella cheese, shredded",
      "1 cup Cheddar cheese, shredded",
      "1 tsp Taco seasoning",
      "2 tbsp Butter",
      "Salsa and sour cream for dipping"
    ],
    steps: [
      "Melt a teaspoon of butter in a pan over medium heat.",
      "Place one tortilla in the pan, sprinkle a generous amount of cheeses, and dust with taco seasoning.",
      "Place another tortilla on top. Cook for 3 minutes until the bottom is crispy, then flip.",
      "Cook the other side until the cheese is completely melted.",
      "Remove, let cool slightly, and cut into 1-inch strips (dippers).",
      "Serve with salsa and sour cream."
    ],
    tags: ["cheese", "quesadilla", "mexican", "appetizer", "kids"],
    youtubeUrl: "https://www.youtube.com/watch?v=nfGrOBP6NKU"
  },

  // Main Course (4 recipes)
  {
    title: "Hyderabadi Dum Biryani",
    description: "A rich and fragrant rice dish featuring layered basmati rice and marinated chicken cooked on slow steam (dum).",
    category: "Main Course",
    cookTime: 65,
    ingredients: [
      "1kg Basmati rice",
      "1kg Chicken pieces",
      "1 cup Fried onions (Birista)",
      "1/2 cup Mint and Coriander leaves",
      "2 tbsp Biryani masala",
      "1/2 cup Yogurt",
      "3 tbsp Ghee",
      "Saffron milk"
    ],
    steps: [
      "Marinate chicken with yogurt, half of the fried onions, mint, coriander, biryani masala, and salt for 2 hours.",
      "Parboil basmati rice until 70% cooked and drain.",
      "In a heavy pot, layer the marinated chicken at the bottom, followed by the parboiled rice.",
      "Top with remaining fried onions, ghee, mint, and saffron milk.",
      "Seal the lid with foil or dough and cook on low heat for 40-45 minutes.",
      "Fluff and serve warm."
    ],
    tags: ["biryani", "rice", "indian", "main-course", "chicken"],
    youtubeUrl: "https://www.youtube.com/watch?v=rtR9T850vfU"
  },
  {
    title: "Classic Spaghetti Carbonara",
    description: "Authentic Roman spaghetti cooked with egg yolks, high-quality Pecorino Romano cheese, pancetta, and black pepper.",
    category: "Main Course",
    cookTime: 20,
    ingredients: [
      "350g Spaghetti",
      "150g Pancetta or bacon, diced",
      "4 Egg yolks",
      "1 cup Pecorino Romano, grated",
      "1 tbsp Black pepper, freshly ground",
      "Salt to taste"
    ],
    steps: [
      "Boil spaghetti in salted water until al dente.",
      "In a skillet, cook pancetta over medium heat until crispy and fats are rendered.",
      "In a bowl, mix egg yolks, grated cheese, and black pepper to form a thick paste.",
      "Drain pasta, reserving some cooking water.",
      "Combine hot pasta with pancetta in the skillet (off heat). Pour in the egg mixture and toss quickly, adding splashes of pasta water to form a smooth cream sauce."
    ],
    tags: ["pasta", "italian", "spaghetti", "carbonara", "classic"],
    youtubeUrl: "https://www.youtube.com/watch?v=k1Np28NnP40"
  },
  {
    title: "Gourmet Beef Stir Fry",
    description: "Tender strips of beef seared in a hot wok with fresh broccoli florets, snap peas, and a savory soy ginger sauce.",
    category: "Main Course",
    cookTime: 25,
    ingredients: [
      "500g Beef flank steak, thinly sliced",
      "2 cups Broccoli florets",
      "1 cup Snap peas",
      "3 tbsp Soy sauce",
      "1 tbsp Ginger, grated",
      "2 cloves Garlic, minced",
      "1 tbsp Cornstarch",
      "1 tbsp Sesame oil"
    ],
    steps: [
      "Coat beef slices in cornstarch and 1 tablespoon of soy sauce.",
      "Heat sesame oil in a wok over high heat. Sear the beef until browned, then remove.",
      "Stir-fry broccoli and snap peas for 3 minutes until crisp-tender.",
      "Add ginger, garlic, remaining soy sauce, and a splash of water.",
      "Return beef to the wok, toss together on high heat until the sauce coats everything, and serve."
    ],
    tags: ["beef", "stir-fry", "chinese", "main-course", "healthy"],
    youtubeUrl: "https://www.youtube.com/watch?v=kKKHcioA9gA"
  },
  {
    title: "Mexican Enchiladas Verdes",
    description: "Soft corn tortillas rolled around spiced black beans and corn, smothered in a tangy green tomatillo salsa and melted cheese.",
    category: "Main Course",
    cookTime: 40,
    ingredients: [
      "8 Corn tortillas",
      "1 can Black beans, drained",
      "1 cup Sweet corn",
      "2 cups Salsa verde (tomatillo sauce)",
      "1.5 cups Monterey Jack cheese, shredded",
      "1 tsp Cumin powder",
      "Fresh cilantro for garnish"
    ],
    steps: [
      "Preheat oven to 375°F (190°C).",
      "In a bowl, mix black beans, corn, cumin, and salt.",
      "Dip each corn tortilla in salsa verde, stuff with the bean mixture, and roll tightly.",
      "Place rolled enchiladas side-by-side in a baking dish.",
      "Pour remaining salsa verde over the top and cover generously with shredded cheese.",
      "Bake for 20 minutes until the cheese is melted and bubbling. Garnish with fresh cilantro."
    ],
    tags: ["enchiladas", "mexican", "main-course", "vegetarian", "cheese"],
    youtubeUrl: "https://www.youtube.com/watch?v=ptp4NcWxfNE"
  },

  // Desserts (4 recipes)
  {
    title: "Molten Lava Chocolate Cake",
    description: "An indulgent chocolate cake featuring firm outer edges and a warm, decadent molten chocolate center.",
    category: "Desserts",
    cookTime: 20,
    ingredients: [
      "100g Semi-sweet chocolate, chopped",
      "1/2 cup Butter",
      "2 whole Eggs",
      "2 Egg yolks",
      "1/4 cup Sugar",
      "3 tbsp All-purpose flour",
      "Pinch of salt"
    ],
    steps: [
      "Preheat oven to 425°F (218°C). Grease ramekins and dust with cocoa powder.",
      "Melt chocolate and butter together until completely smooth.",
      "Whisk eggs, egg yolks, sugar, and salt until pale and thick.",
      "Gently fold the melted chocolate and flour into the egg mixture.",
      "Divide the batter into ramekins and bake for 12 minutes until edges are set but center jiggles.",
      "Invert onto plates and serve immediately."
    ],
    tags: ["dessert", "chocolate", "cake", "baking", "sweet"],
    youtubeUrl: "https://youtu.be/gW3JtHpuzrk?si=h90X5Ki_WtbZRy3T"
  },
  {
    title: "Bakery Chocolate Chip Cookies",
    description: "Classic large bakery-style cookies with crispy edges and thick, soft, and extra chewy centers packed with chocolate chips.",
    category: "Desserts",
    cookTime: 25,
    ingredients: [
      "1 cup Unsalted butter",
      "3/4 cup Brown sugar",
      "3/4 cup Granulated sugar",
      "2 large Eggs",
      "2.25 cups All-purpose flour",
      "1 tsp Baking soda",
      "2 cups Chocolate chips",
      "1/2 tsp Salt"
    ],
    steps: [
      "Beat melted butter, brown sugar, and white sugar until smooth.",
      "Whisk in eggs one at a time, followed by vanilla.",
      "Fold in flour, baking soda, and salt.",
      "Stir in chocolate chips. Chill dough for 30 minutes.",
      "Scoop balls onto a parchment-lined baking sheet.",
      "Bake at 350°F (175°C) for 10 minutes until edges are lightly browned."
    ],
    tags: ["cookies", "dessert", "chocolate", "baking", "chewy"],
    youtubeUrl: "https://youtu.be/07_oj-QXUl0?si=4mCZjUwLdXXbHtE-"
  },
  {
    title: "Classic Homemade Apple Pie",
    description: "A traditional double-crust pie filled with fresh, tender apples coated in a sweet mixture of cinnamon and brown sugar.",
    category: "Desserts",
    cookTime: 70,
    ingredients: [
      "2 Pie crust sheets",
      "6 Granny Smith apples, peeled and sliced",
      "1/2 cup Brown sugar",
      "1 tsp Cinnamon",
      "3 tbsp Flour",
      "1 tbsp Lemon juice",
      "1 Egg (for egg wash)"
    ],
    steps: [
      "Toss sliced apples with lemon juice, brown sugar, flour, and cinnamon.",
      "Drape one pie crust over a pie dish. Fill with the apple mixture.",
      "Place the second crust on top, crimp the edges to seal, and cut steam slits.",
      "Brush with egg wash and bake at 400°F (200°C) for 50 minutes until golden."
    ],
    tags: ["dessert", "apple-pie", "apple", "baking", "comfort-food"],
    youtubeUrl: "https://youtu.be/KbyahTnzbKA?si=u5MrrTwZMDgB-ULC"
  },
  {
    title: "Authentic Italian Tiramisu",
    description: "Classic Italian dessert made of coffee-soaked ladyfingers layered with a whipped mixture of egg yolks, sugar, and mascarpone cheese.",
    category: "Desserts",
    cookTime: 30,
    ingredients: [
      "24 Ladyfinger biscuits",
      "1 cup strong Espresso, cooled",
      "2 cups Mascarpone cheese",
      "4 Egg yolks",
      "1/2 cup Sugar",
      "1.5 cups Heavy cream",
      "Cocoa powder for dusting"
    ],
    steps: [
      "Whisk egg yolks and sugar over a double boiler until pale and creamy. Let cool.",
      "Beat mascarpone cheese into the egg mixture until smooth.",
      "In a separate bowl, whip heavy cream to stiff peaks and gently fold into mascarpone cream.",
      "Quickly dip ladyfingers in cooled espresso and arrange in a single layer at the bottom of a dish.",
      "Spread half of the mascarpone cream over the ladyfingers.",
      "Add another layer of dipped ladyfingers and cover with remaining cream.",
      "Dust generously with cocoa powder and refrigerate for at least 4 hours before serving."
    ],
    tags: ["tiramisu", "dessert", "italian", "coffee", "sweet"],
    youtubeUrl: "https://www.youtube.com/watch?v=ZZoLlQNdp7Q"
  },

  // Salad (4 recipes)
  {
    title: "Classic Caesar Salad",
    description: "Crisp romaine lettuce tossed in a creamy garlic Parmesan Caesar dressing, topped with crunchy baked garlic croutons.",
    category: "Salad",
    cookTime: 15,
    ingredients: [
      "1 head Romaine lettuce, chopped",
      "1 cup Croutons",
      "1/2 cup Parmesan cheese, grated",
      "3 tbsp Caesar dressing",
      "2 cloves Garlic",
      "1 tbsp Olive oil"
    ],
    steps: [
      "Wash and thoroughly dry the romaine lettuce leaves, then chop them into bite-sized pieces.",
      "In a large salad bowl, combine the chopped lettuce and half of the Parmesan cheese.",
      "Drizzle Caesar dressing over the lettuce and toss gently to coat the leaves evenly.",
      "Top with crispy croutons and the remaining grated Parmesan cheese.",
      "Serve chilled immediately."
    ],
    tags: ["salad", "caesar", "healthy", "vegetarian", "classic"],
    youtubeUrl: "https://www.youtube.com/watch?v=n2JfwHwseyY"
  },
  {
    title: "Traditional Greek Salad",
    description: "A fresh and crunchy salad of cucumbers, ripe tomatoes, red onions, Kalamata olives, and a block of creamy feta cheese.",
    category: "Salad",
    cookTime: 12,
    ingredients: [
      "2 English cucumbers, sliced",
      "3 ripe Tomatoes, cut into wedges",
      "1/2 Red onion, thinly sliced",
      "1/2 cup Kalamata olives",
      "150g Feta cheese",
      "3 tbsp Extra virgin olive oil",
      "1 tbsp Dried oregano"
    ],
    steps: [
      "In a large bowl, combine the sliced cucumbers, tomato wedges, and red onion slices.",
      "Add the Kalamata olives to the bowl.",
      "Drizzle extra virgin olive oil and a squeeze of fresh lemon juice over the vegetables.",
      "Sprinkle dried oregano and toss the salad gently to mix.",
      "Place a large block of feta cheese on top of the salad before serving."
    ],
    tags: ["salad", "greek", "healthy", "feta", "mediterranean"],
    youtubeUrl: "https://www.youtube.com/watch?v=36QOkwvNzts"
  },
  {
    title: "Caprese Mozzarella Salad",
    description: "A simple Italian salad made of sliced fresh mozzarella, ripe tomatoes, sweet basil, seasoned with salt, olive oil, and balsamic glaze.",
    category: "Salad",
    cookTime: 10,
    ingredients: [
      "3 ripe Roma tomatoes, sliced",
      "250g Fresh Mozzarella cheese, sliced",
      "1 bunch Fresh basil leaves",
      "2 tbsp Extra virgin olive oil",
      "1 tbsp Balsamic glaze",
      "Salt and pepper to taste"
    ],
    steps: [
      "Alternate slices of tomato and fresh mozzarella on a serving platter.",
      "Tuck fresh basil leaves between the tomato and cheese slices.",
      "Drizzle extra virgin olive oil and balsamic glaze evenly over the top.",
      "Season with a pinch of sea salt and freshly cracked black pepper right before serving."
    ],
    tags: ["salad", "caprese", "italian", "cheese", "vegetarian"],
    youtubeUrl: "https://www.youtube.com/watch?v=riTriHkenjs"
  },
  {
    title: "Mediterranean Quinoa Salad",
    description: "A nutritious, colorful salad of cooked quinoa, crisp cucumbers, bell peppers, parsley, and a zesty lemon herb dressing.",
    category: "Salad",
    cookTime: 20,
    ingredients: [
      "1 cup Quinoa",
      "2 cups Water",
      "1 Cucumber, diced",
      "1 Bell pepper, diced",
      "1/4 cup Red onion, finely chopped",
      "1/2 cup Fresh parsley, chopped",
      "3 tbsp Olive oil",
      "2 tbsp Lemon juice"
    ],
    steps: [
      "Rinse quinoa and combine with water in a saucepan. Bring to a boil, then simmer on low for 15 minutes until water is absorbed. Let cool.",
      "In a large bowl, combine the cooled quinoa, diced cucumber, diced bell pepper, red onion, and chopped parsley.",
      "Whisk olive oil, lemon juice, salt, and pepper in a small cup.",
      "Pour dressing over the salad and toss well. Chill for 10 minutes before serving."
    ],
    tags: ["salad", "quinoa", "healthy", "vegan", "mediterranean"],
    youtubeUrl: "https://www.youtube.com/watch?v=-VDlsEIltho"
  },

  // Soup (4 recipes)
  {
    title: "Roasted Creamy Tomato Soup",
    description: "Rich, comforting soup made with roasted tomatoes, onions, garlic, and fresh basil leaves, blended to a silky-smooth texture.",
    category: "Soup",
    cookTime: 30,
    ingredients: [
      "1kg Ripe tomatoes, halved",
      "1 Onion, quartered",
      "4 cloves Garlic",
      "2 tbsp Olive oil",
      "2 cups Vegetable broth",
      "1/4 cup Heavy cream",
      "Fresh basil leaves"
    ],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Toss tomatoes, onions, and garlic in olive oil, salt, and pepper. Arrange on a baking sheet and roast for 20 minutes.",
      "Transfer roasted vegetables to a large pot, pour in vegetable broth, and bring to a simmer.",
      "Add fresh basil leaves and blend the soup using an immersion blender until completely smooth.",
      "Stir in heavy cream and simmer for 5 minutes. Serve hot with grilled cheese."
    ],
    tags: ["soup", "tomato", "comfort-food", "vegetarian", "creamy"],
    youtubeUrl: "https://www.youtube.com/watch?v=KSZHRPhJmiQ"
  },
  {
    title: "Restaurant-Style Tomato Soup",
    description: "Classic creamy tomato soup served with golden garlic herb butter croutons, ideal for cold winter evenings.",
    category: "Soup",
    cookTime: 25,
    ingredients: [
      "800g Canned crushed tomatoes",
      "1 Onion, finely chopped",
      "2 tbsp Butter",
      "1.5 cups Vegetable stock",
      "1/2 cup Milk",
      "1 cup Croutons"
    ],
    steps: [
      "Melt butter in a pot. Sauté chopped onions until translucent.",
      "Add crushed tomatoes and vegetable stock. Simmer for 15 minutes.",
      "Blend until smooth, return to heat, and stir in milk.",
      "Serve topped with garlic herb croutons."
    ],
    tags: ["soup", "tomato", "classic", "easy", "creamy"],
    youtubeUrl: "https://www.youtube.com/watch?v=L37tAYIKyCs"
  },
  {
    title: "Classic French Onion Soup",
    description: "A rich, deeply flavored soup featuring sweet caramelized onions, dry sherry, beef stock, topped with crusty bread and melted Gruyere.",
    category: "Soup",
    cookTime: 50,
    ingredients: [
      "1kg Yellow onions, thinly sliced",
      "3 tbsp Butter",
      "1/2 cup Dry white wine or sherry",
      "4 cups Beef stock",
      "1 Baguette, sliced",
      "1.5 cups Gruyere cheese, grated"
    ],
    steps: [
      "Melt butter in a large pot. Cook sliced onions on low heat for 35-40 minutes, stirring occasionally, until deeply caramelized.",
      "Pour in white wine to deglaze the pot, scraping up browned bits.",
      "Add beef stock and simmer for 15 minutes.",
      "Ladle soup into oven-safe bowls, place a slice of toasted baguette on top, and cover generously with Gruyere cheese.",
      "Broil in the oven for 3-4 minutes until the cheese is melted, bubbly, and golden brown."
    ],
    tags: ["soup", "onion", "french", "cheese", "comfort-food"],
    youtubeUrl: "https://www.youtube.com/watch?v=Ptauy20rLjg"
  },
  {
    title: "Minestrone Vegetable Soup",
    description: "A thick, hearty Italian vegetable soup loaded with pasta, beans, celery, carrots, tomatoes, and fresh herbs.",
    category: "Soup",
    cookTime: 35,
    ingredients: [
      "1 can Diced tomatoes",
      "1 can Cannellini beans, drained",
      "1 cup Ditalini or macaroni pasta",
      "2 Carrots, diced",
      "2 Celery stalks, diced",
      "1 Zucchini, diced",
      "4 cups Vegetable broth",
      "1 tsp Italian seasoning"
    ],
    steps: [
      "Sauté diced carrots, celery, and onions in olive oil in a large pot until soft.",
      "Add zucchini, diced tomatoes, vegetable broth, and Italian seasoning. Bring to a boil.",
      "Add pasta and cook until pasta is al dente (about 8-10 minutes).",
      "Stir in cannellini beans and simmer for 5 minutes. Serve with a sprinkle of Parmesan cheese."
    ],
    tags: ["soup", "minestrone", "italian", "vegetables", "healthy"],
    youtubeUrl: "https://www.youtube.com/watch?v=qEowX-vOb4E"
  },

  // Beverages (3 recipes)
  {
    title: "Classic Lemon Mojito",
    description: "A refreshing summer drink featuring muddled fresh mint leaves, lime wedges, sugar, white rum, and sparkling soda.",
    category: "Beverages",
    cookTime: 5,
    ingredients: [
      "10 Fresh mint leaves",
      "1/2 Lime, cut into wedges",
      "2 tbsp Sugar",
      "1 cup Club soda",
      "Crushed ice"
    ],
    steps: [
      "Place mint leaves and lime wedges at the bottom of a sturdy glass.",
      "Use a muddler to gently mash the mint and lime to release their oils and juice.",
      "Add sugar and fill the glass with crushed ice.",
      "Pour club soda over the ice and stir thoroughly to combine the sugar.",
      "Garnish with a sprig of fresh mint and a lime wheel."
    ],
    tags: ["mojito", "mint", "drink", "refreshing", "summer"],
    youtubeUrl: "https://www.youtube.com/watch?v=2PU1CPLMUF4"
  },
  {
    title: "Sweet Mango Lassi",
    description: "A popular, traditional creamy yogurt drink blended with ripe mango pulp, milk, sugar, and a pinch of cardamom.",
    category: "Beverages",
    cookTime: 8,
    ingredients: [
      "1 cup Ripe mango pulp",
      "1 cup Plain yogurt",
      "1/2 cup Milk",
      "2 tbsp Sugar",
      "1/4 tsp Cardamom powder",
      "Saffron threads for garnish"
    ],
    steps: [
      "Combine mango pulp, plain yogurt, milk, sugar, and cardamom powder in a blender.",
      "Blend on high speed until completely smooth and frothy.",
      "Pour into glasses and garnish with a few saffron threads.",
      "Serve chilled immediately."
    ],
    tags: ["mango", "lassi", "indian", "drink", "yogurt", "sweet"],
    youtubeUrl: "https://www.youtube.com/watch?v=tLW8RhxHWMk"
  },
  {
    title: "Frothy Dalgona Iced Latte",
    description: "Whipped instant coffee cream served over ice-cold milk, topped with grated dark chocolate.",
    category: "Beverages",
    cookTime: 10,
    ingredients: [
      "2 tbsp Instant coffee",
      "2 tbsp Sugar",
      "2 tbsp Hot water",
      "1 cup Cold milk",
      "Ice cubes",
      "1 tsp Grated dark chocolate"
    ],
    steps: [
      "Whip instant coffee, sugar, and hot water together using an electric mixer until very thick and light brown.",
      "Place ice cubes in a glass and fill with cold milk.",
      "Spoon the whipped coffee foam over the milk.",
      "Dust with grated dark chocolate and serve with a straw."
    ],
    tags: ["coffee", "dalgona", "iced", "sweet", "drink"],
    youtubeUrl: "https://www.youtube.com/watch?v=KBq-g0-LIoA"
  },

  // Snacks (3 recipes)
  {
    title: "Mexican Tacos Al Pastor",
    description: "Tasty Mexican street tacos featuring tender pork shoulder marinated in a flavorful blend of guajillo chilies and sweet pineapples.",
    category: "Snacks",
    cookTime: 40,
    ingredients: [
      "500g Pork shoulder, sliced",
      "2 Guajillo chilies",
      "1/2 cup Pineapple juice",
      "1 cup Pineapple chunks",
      "10 Corn tortillas",
      "Onion and cilantro, chopped"
    ],
    steps: [
      "Boil guajillo chilies until soft, then blend with pineapple juice and spices to make the marinade.",
      "Marinate pork shoulder slices for 2 hours.",
      "Sear the pork and pineapple chunks in a hot pan until charred and cooked through. Chop into small pieces.",
      "Serve inside warmed corn tortillas, topped with onions, cilantro, and fresh pineapple."
    ],
    tags: ["tacos", "mexican", "snack", "pork", "street-food"],
    youtubeUrl: "https://youtu.be/ckHbv_CR6SA?si=Bo30SlJsC9ji1ppi"
  },
  {
    title: "Caramelized Grill Pork Tacos",
    description: "Marinated pork slices grilled to a charred, caramelized finish on a stovetop griddle, served on soft corn tortillas.",
    category: "Snacks",
    cookTime: 30,
    ingredients: [
      "500g Pork loin, thinly sliced",
      "2 tbsp Achiote paste",
      "2 tbsp White vinegar",
      "1/2 cup Grilled pineapple, chopped",
      "Corn tortillas"
    ],
    steps: [
      "Mix achiote paste and vinegar, and rub over pork slices.",
      "Cook pork slices on a smoking hot griddle until deeply caramelized and slightly charred.",
      "Chop pork and assemble tacos on warm tortillas with grilled pineapple."
    ],
    tags: ["tacos", "mexican", "pork", "grill", "snack"],
    youtubeUrl: "https://www.youtube.com/watch?v=wELdEo-L7GE"
  },
  {
    title: "Smoked Pit BBQ Tacos",
    description: "Tender, smoky barbecue pork chopped and served on corn tortillas with a garnish of pineapple salsa and lime.",
    category: "Snacks",
    cookTime: 45,
    ingredients: [
      "500g Pork shoulder",
      "3 tbsp BBQ dry rub",
      "1/2 cup Pineapple salsa",
      "Corn tortillas",
      "Lime wedges"
    ],
    steps: [
      "Coat pork shoulder with dry rub and cook on a barbecue grill or smoker until tender.",
      "Shred the pork into bite-sized pieces.",
      "Assemble on warm corn tortillas, top with pineapple salsa, and serve with lime wedges."
    ],
    tags: ["bbq", "tacos", "mexican", "pork", "smoker", "snack"],
    youtubeUrl: "https://www.youtube.com/watch?v=Igp0GN9Du9M"
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

    // Find the demo user
    const demoUser = await User.findOne({ email: 'demo@recipe.com' });
    if (!demoUser) {
      console.error('Error: Demo user with email demo@recipe.com not found. Run seed.js first.');
      mongoose.connection.close();
      process.exit(1);
    }

    console.log(`Found demo user: ${demoUser.name} (${demoUser._id})`);

    // Prepare new recipes with demoUser._id as author
    const preparedRecipes = newRecipesData.map(recipe => ({
      ...recipe,
      author: demoUser._id
    }));

    console.log('Seeding 30 new recipes...');
    const insertedRecipes = await Recipe.insertMany(preparedRecipes);
    console.log(`Successfully seeded ${insertedRecipes.length} new recipes!`);

    console.log('Database seeding complete!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDB();
