import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Edit, Trash2, Clock, Tag, AlertCircle, PlusCircle, ArrowLeft } from 'lucide-react';

const MyRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/recipes/my-recipes');
      setRecipes(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve your recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the recipe "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/api/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete the recipe. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      return urlObj.searchParams.get('v');
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5 dark:border-white/5">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent mb-2 group transition-colors duration-200 cursor-pointer text-sm font-semibold bg-transparent border-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">My Recipes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and edit the recipes you have shared.</p>
        </div>

        <Link
          to="/add-recipe"
          className="flex items-center space-x-2 btn-primary-premium cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Recipe</span>
        </Link>
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
            <div key={i} className="glass rounded-3xl overflow-hidden flex flex-col h-[400px] shimmer">
              <div className="aspect-[4/3] bg-black/5 dark:bg-white/5" />
              <div className="p-6 flex-grow flex flex-col gap-4">
                <div className="h-6 bg-black/5 dark:bg-white/5 rounded-full w-3/4" />
                <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-1/2" />
                <div className="mt-auto h-12 bg-black/5 dark:bg-white/5 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="glass text-center py-16 px-6 rounded-3xl max-w-xl mx-auto">
          <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-black/5 dark:border-white/5">
            <PlusCircle className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">You haven't shared any recipes yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
            Unleash your inner chef! Share your first recipe with the community and start your culinary journal.
          </p>
          <Link
            to="/add-recipe"
            className="inline-flex items-center space-x-2 btn-primary-premium cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Recipe</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => {
            const youtubeId = getYouTubeId(recipe.youtubeUrl);
            const displayImage = youtubeId
              ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
              : recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800';

            return (
              <div key={recipe._id} className="glass glass-hover rounded-3xl overflow-hidden flex flex-col h-full group relative">
                {/* Recipe Cover Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-slate-950">
                  <img
                    src={displayImage}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/15 border border-accent/25 backdrop-blur-md rounded-full shadow-lg">
                    <Tag className="w-3.5 h-3.5 mr-1" />
                    {recipe.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300">
                    <Link to={`/recipe/${recipe._id}`} className="text-gray-800 dark:text-white">{recipe.title}</Link>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-gray-700 dark:text-white">{recipe.cookTime} mins</span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                      className="flex items-center justify-center space-x-1.5 btn-premium font-semibold text-xs cursor-pointer w-full"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id, recipe.title)}
                      disabled={deletingId === recipe._id}
                      className="flex items-center justify-center space-x-1.5 py-2 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/10 hover:border-rose-500/30 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-semibold text-xs rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
