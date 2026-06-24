import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import { Search, SlidersHorizontal, AlertCircle, RefreshCw, Clock } from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Breakfast',
  'Appetizers',
  'Main Course',
  'Desserts',
  'Salad',
  'Soup',
  'Beverages',
  'Snacks'
];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering states
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [maxTime, setMaxTime] = useState(120);

  // Debouncing search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetching recipes
  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (category && category !== 'All Categories') params.category = category;
      if (maxTime) params.maxTime = maxTime;

      const response = await api.get('/api/recipes', { params });
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, category, maxTime]);

  const handleResetFilters = () => {
    setSearchInput('');
    setCategory('');
    setMaxTime(120);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex-grow">
      {/* Hero Section */}
      <div className="glass text-center py-12 md:py-16 mb-8 relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="text-accent text-xs font-semibold uppercase tracking-wider bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
            Welcome to Recipify
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mt-4 tracking-tight leading-tight">
            Discover & Share <span className="text-accent">Culinary</span> Masterpieces
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm md:text-base leading-relaxed">
            Browse through a curated list of delicious recipes from home cooks and professional chefs worldwide. Filter by category, prep time, or search directly.
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="glass p-6 rounded-3xl mb-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Filters</h2>
          </div>
          {(searchInput || (category && category !== 'All Categories') || maxTime !== 120) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-accent hover:underline cursor-pointer flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 font-medium" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search recipes, tags or descriptions..."
              className="input-premium w-full pl-12 pr-4"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={category || 'All Categories'}
              onChange={(e) => setCategory(e.target.value)}
              className="input-premium w-full cursor-pointer appearance-none relative"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-gray-800 dark:text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Max Cook Time */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Max Cook Time:</span>
              </span>
              <span className="text-xs font-bold text-accent">{maxTime} mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="240"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-accent h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 p-4 rounded-2xl mb-8 text-sm max-w-lg mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of Recipes / Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden flex flex-col h-96 shimmer">
              <div className="aspect-[4/3] bg-black/5 dark:bg-white/5" />
              <div className="p-6 flex-grow flex flex-col gap-4">
                <div className="h-6 bg-black/5 dark:bg-white/5 rounded-full w-3/4" />
                <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-5/6" />
                <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-1/2" />
                <div className="mt-auto h-10 bg-black/5 dark:bg-white/5 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="glass text-center py-16 px-6 rounded-3xl">
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/5">
            <SlidersHorizontal className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Recipes Found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            We couldn't find any recipes matching your current filters. Try refining your search terms or expanding the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
