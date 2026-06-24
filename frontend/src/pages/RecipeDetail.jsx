import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Clock, Tag, User, BookOpen, AlertCircle, Check } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || 'Failed to load recipe details. It may not exist.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleStep = (index) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 flex-grow shimmer">
        <div className="h-6 bg-black/5 dark:bg-white/5 rounded-full w-24 mb-6" />
        <div className="h-10 bg-black/5 dark:bg-white/5 rounded-full w-3/4 mb-4" />
        <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-1/3 mb-8" />
        <div className="aspect-[21/9] bg-black/5 dark:bg-white/5 rounded-3xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 h-64 bg-black/5 dark:bg-white/5 rounded-3xl" />
          <div className="md:col-span-2 h-64 bg-black/5 dark:bg-white/5 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 flex-grow text-center">
        <div className="glass p-8 rounded-3xl">
          <div className="bg-rose-500/10 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-rose-500/10">
            <AlertCircle className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Recipe</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">{error || 'Recipe not found'}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 btn-primary-premium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const { title, description, category, cookTime, imageUrl, youtubeUrl, ingredients, steps, tags, author } = recipe;
  const youtubeId = getYouTubeId(youtubeUrl);
  const displayImage = imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1200';

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex-grow">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent mb-6 group transition-colors duration-200 cursor-pointer text-sm font-semibold bg-transparent border-0"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Go Back</span>
      </button>

      {/* Main Recipe Info Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full">
            <Tag className="w-3.5 h-3.5 mr-1" />
            {category}
          </span>
          <span className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full">
            <Clock className="w-3.5 h-3.5 mr-1 text-accent" />
            {cookTime} Mins
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight mb-3">
          {title}
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
            <User className="w-4 h-4 text-accent" />
          </div>
          <span>
            Created by <span className="text-gray-800 dark:text-white font-semibold">{author?.name || 'Anonymous Chef'}</span>
          </span>
        </div>
      </div>

      {/* Recipe Cover Video / Image */}
      {youtubeId ? (
        <div className="aspect-video rounded-3xl overflow-hidden mb-8 border border-black/5 dark:border-white/5 shadow-2xl bg-slate-950">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-8 border border-black/5 dark:border-white/5 shadow-2xl bg-slate-950">
          <img src={displayImage} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Description */}
      <div className="glass p-6 rounded-3xl mb-8">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <span>Description</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      {/* Ingredients & Steps Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Ingredients Column */}
        <div className="md:col-span-1">
          <div className="glass p-6 rounded-3xl h-full">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-black/5 dark:border-white/5 pb-2">
              Ingredients
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Tap items to cross them off</p>
            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  onClick={() => toggleIngredient(index)}
                  className={`flex items-start space-x-2.5 p-2 rounded-xl cursor-pointer select-none transition-all duration-200 ${checkedIngredients[index]
                    ? 'bg-accent/5 text-gray-500 line-through'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'
                    }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${checkedIngredients[index]
                      ? 'border-accent bg-accent text-white'
                      : 'border-black/20 dark:border-white/20'
                      }`}
                  >
                    {checkedIngredients[index] && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Column */}
        <div className="md:col-span-2">
          <div className="glass p-6 rounded-3xl h-full">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-black/5 dark:border-white/5 pb-2">
              Instructions
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Check steps as you complete them</p>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`flex items-start space-x-4 p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${completedSteps[index]
                    ? 'bg-accent/5 border border-accent/10 opacity-60'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${completedSteps[index]
                      ? 'bg-accent text-white'
                      : 'bg-black/10 dark:bg-white/10 text-gray-800 dark:text-white'
                      }`}
                  >
                    {completedSteps[index] ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-grow">
                    <p
                      className={`text-sm leading-relaxed font-medium ${completedSteps[index] ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      {step}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Tags chips footer */}
      {tags && tags.length > 0 && (
        <div className="glass p-6 rounded-3xl">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
            Recipe Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
