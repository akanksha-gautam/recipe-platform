import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import {
  Compass,
  ArrowLeft,
  Flame,
  Soup,
  Coffee,
  IceCream,
  Pizza,
  UtensilsCrossed,
  Sparkles,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Indian',
    emoji: '🌶️',
    gradient: 'from-orange-500/10 to-red-500/10 hover:border-orange-500/35 hover:shadow-orange-500/5',
    border: 'border-orange-500/20',
    icon: Flame,
    color: 'text-orange-400',
    desc: 'Spicy, rich, and aromatic traditional curries and biryanis.'
  },
  {
    name: 'Italian',
    emoji: '🍕',
    gradient: 'from-emerald-500/10 to-red-500/10 hover:border-red-500/35 hover:shadow-red-500/5',
    border: 'border-red-500/20',
    icon: Pizza,
    color: 'text-red-400',
    desc: 'Artisanal pizzas, pasta, risottos, and Italian herbs.'
  },
  {
    name: 'Chinese',
    emoji: '🥢',
    gradient: 'from-yellow-500/10 to-amber-500/10 hover:border-amber-500/35 hover:shadow-amber-500/5',
    border: 'border-amber-500/20',
    icon: UtensilsCrossed,
    color: 'text-amber-400',
    desc: 'Savory stir-fries, noodles, dim sum, and wok creations.'
  },
  {
    name: 'Mexican',
    emoji: '🌮',
    gradient: 'from-amber-600/10 to-orange-600/10 hover:border-orange-600/35 hover:shadow-orange-600/5',
    border: 'border-orange-600/20',
    icon: Sparkles,
    color: 'text-orange-500',
    desc: 'Flavorful tacos, burritos, quesadillas, and fresh salsas.'
  },
  {
    name: 'Desserts',
    emoji: '🍰',
    gradient: 'from-pink-500/10 to-purple-500/10 hover:border-pink-500/35 hover:shadow-pink-500/5',
    border: 'border-pink-500/20',
    icon: IceCream,
    color: 'text-pink-400',
    desc: 'Cakes, cookies, puddings, and sweet culinary delights.'
  },
  {
    name: 'Beverages',
    emoji: '🍹',
    gradient: 'from-blue-500/10 to-cyan-500/10 hover:border-cyan-500/35 hover:shadow-cyan-500/5',
    border: 'border-cyan-500/20',
    icon: Coffee,
    color: 'text-cyan-400',
    desc: 'Refreshing drinks, mocktails, juices, and hot coffees.'
  },
  {
    name: 'Snacks',
    emoji: '🍿',
    gradient: 'from-teal-500/10 to-emerald-500/10 hover:border-teal-500/35 hover:shadow-teal-500/5',
    border: 'border-teal-500/20',
    icon: Sparkles,
    color: 'text-teal-400',
    desc: 'Quick bites, finger foods, and crispy afternoon appetizers.'
  },
  {
    name: 'Soup',
    emoji: '🍲',
    gradient: 'from-teal-600/10 to-blue-600/10 hover:border-teal-600/35 hover:shadow-teal-600/5',
    border: 'border-teal-600/20',
    icon: Soup,
    color: 'text-teal-400',
    desc: 'Warm, comforting broths, stews, and vegetable chowders.'
  },
  {
    name: 'Breakfast',
    emoji: '🍳',
    gradient: 'from-amber-400/10 to-orange-400/10 hover:border-amber-400/35 hover:shadow-amber-400/5',
    border: 'border-amber-400/20',
    icon: UtensilsCrossed,
    color: 'text-amber-300',
    desc: 'Energizing morning meals, pancakes, waffles, and eggs.'
  },
  {
    name: 'Appetizers',
    emoji: '🍢',
    gradient: 'from-indigo-500/10 to-purple-500/10 hover:border-indigo-500/35 hover:shadow-indigo-500/5',
    border: 'border-indigo-500/20',
    icon: Sparkles,
    color: 'text-indigo-400',
    desc: 'Delectable starters, plating samples, and savory treats.'
  },
  {
    name: 'Salad',
    emoji: '🥗',
    gradient: 'from-lime-500/10 to-green-500/10 hover:border-lime-500/35 hover:shadow-lime-500/5',
    border: 'border-lime-500/20',
    icon: UtensilsCrossed,
    color: 'text-lime-400',
    desc: 'Fresh garden salads, green greens, and healthy vinaigrettes.'
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedCategory) {
      setRecipes([]);
      return;
    }

    const fetchRecipesByCategory = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/api/recipes', {
          params: { category: selectedCategory },
        });
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${selectedCategory} recipes. Please try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
      {/* Header and navigation */}
      <div className="mb-8 pb-6 border-b border-black/5 dark:border-white/5">
        <button
          onClick={() => (selectedCategory ? setSelectedCategory(null) : navigate(-1))}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent mb-2 group transition-colors duration-200 cursor-pointer text-sm font-semibold bg-transparent border-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{selectedCategory ? 'Back to Categories' : 'Go Back'}</span>
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center space-x-2.5">
          <Compass className="w-8 h-8 text-accent" />
          <span>{selectedCategory ? `${selectedCategory} Recipes` : 'Explore Categories'}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {selectedCategory
            ? `Browse through delicious recipes in the ${selectedCategory} category.`
            : 'Browse through our curated list of cooking styles and recipe categories.'}
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 p-4 rounded-2xl mb-8 text-sm max-w-lg mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {selectedCategory ? (
        /* Recipes in selected category */
        loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass rounded-3xl overflow-hidden flex flex-col h-96 shimmer">
                <div className="aspect-[4/3] bg-black/5 dark:bg-white/5" />
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <div className="h-6 bg-black/5 dark:bg-white/5 rounded-full w-3/4" />
                  <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-1/2" />
                  <div className="mt-auto h-10 bg-black/5 dark:bg-white/5 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="glass text-center py-16 px-6 rounded-3xl max-w-xl mx-auto">
            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/5">
              <FolderOpen className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Recipes Found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              We couldn't find any recipes inside the "{selectedCategory}" category yet. Why not share yours?
            </p>
            <button
              onClick={() => navigate('/add-recipe')}
              className="inline-flex items-center space-x-2 btn-primary-premium cursor-pointer border-0"
            >
              <span>Add a Recipe</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )
      ) : (
        /* Categories list */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`glass glass-hover p-6 rounded-3xl flex flex-col h-full border ${cat.border} bg-gradient-to-br ${cat.gradient} cursor-pointer group relative`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl filter drop-shadow">{cat.emoji}</span>
                  <div className={`p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 ${cat.color} transition-colors`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-accent transition-colors duration-200">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xxs font-bold text-accent group-hover:underline flex items-center justify-end">
                  <span>View Recipes &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
