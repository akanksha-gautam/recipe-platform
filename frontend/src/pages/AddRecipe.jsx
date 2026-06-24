import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Trash, AlertCircle, Save, ArrowLeft, PlusCircle } from 'lucide-react';

const CATEGORIES = ['Breakfast', 'Appetizers', 'Main Course', 'Desserts', 'Salad', 'Soup', 'Beverages', 'Snacks'];

const AddRecipe = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Dynamic lists
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Ingredient handlers
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length === 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Step handlers
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length === 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Field validations
    if (!title || !description || !category || !cookTime) {
      setError('Please fill in all required fields');
      return;
    }

    // Filter out empty entries in lists
    const filteredIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const filteredSteps = steps.map((s) => s.trim()).filter(Boolean);

    if (filteredIngredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    if (filteredSteps.length === 0) {
      setError('Please add at least one step of instruction');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    setLoading(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      ingredients: filteredIngredients,
      steps: filteredSteps,
      category,
      cookTime: Number(cookTime),
      youtubeUrl: youtubeUrl.trim(),
      tags,
    };

    try {
      await api.post('/api/recipes', payload);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to create recipe. Please check your inputs.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex-grow">
      {/* Cancel button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-accent mb-6 group transition-colors duration-200 cursor-pointer text-sm font-semibold bg-transparent border-0"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Cancel</span>
      </button>

      <div className="glass p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-8 border-b border-black/5 dark:border-white/5 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Share a Recipe</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Fill in the details below to publish your culinary creation.
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 p-4 rounded-2xl mb-6 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Recipe Title <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Classic Margherita Pizza"
              className="input-premium"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Short Description <span className="text-accent">*</span>
            </label>
            <textarea
              required
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your dish, its origin, or why you love it..."
              className="input-premium resize-none"
            />
          </div>

          {/* Category & Cook Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Category <span className="text-accent">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-premium cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <option value="" disabled className="bg-white dark:bg-slate-900 text-gray-500">
                  Select Category
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-gray-800 dark:text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Cook Time (Minutes) <span className="text-accent">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                placeholder="e.g. 45"
                className="input-premium"
              />
            </div>
          </div>

          {/* YouTube Video URL & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="input-premium"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Italian, Dinner, Spicy, Vegan"
                className="input-premium"
              />
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="border-t border-black/5 dark:border-white/5 pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Ingredients <span className="text-accent">*</span>
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center space-x-1 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient #${index + 1} (e.g. 2 cups of flour)`}
                    required
                    className="input-premium flex-grow"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2.5 btn-premium text-rose-500 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Steps Section */}
          <div className="border-t border-black/5 dark:border-white/5 pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                Instructions Steps <span className="text-accent">*</span>
              </label>
              <button
                type="button"
                onClick={addStep}
                className="flex items-center space-x-1 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  <textarea
                    rows="2"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step #${index + 1} instructions...`}
                    required
                    className="input-premium flex-grow resize-none"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="p-2.5 btn-premium text-rose-500 hover:text-rose-600 cursor-pointer mt-1"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-black/5 dark:border-white/5 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 btn-primary-premium rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Publish Recipe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
