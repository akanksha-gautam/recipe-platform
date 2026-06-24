import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';
import { Heart, AlertCircle, Compass, ArrowLeft } from 'lucide-react';

const Favourites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavourites = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/recipes/favourites');
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch your bookmarked recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  // Filter recipes so they disappear immediately if unfavourited on this page
  const visibleRecipes = recipes.filter((recipe) => user?.favourites?.includes(recipe._id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-black/5 dark:border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent mb-2 group transition-colors duration-200 cursor-pointer text-sm font-semibold bg-transparent border-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Go Back</span>
        </button>
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center space-x-2">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span>Favourite Recipes</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Browse through the recipes you have saved for later.</p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 p-4 rounded-2xl mb-8 text-sm max-w-lg mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
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
      ) : visibleRecipes.length === 0 ? (
        <div className="glass text-center py-16 px-6 rounded-3xl max-w-xl mx-auto">
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/5">
            <Heart className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Saved Recipes</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
            Whenever you browse the platform, click the heart icon on any recipe card to save it here for quick access later.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 btn-primary-premium cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Recipes</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
