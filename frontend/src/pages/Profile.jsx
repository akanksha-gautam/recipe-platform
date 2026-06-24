import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
  User,
  Mail,
  FileText,
  Camera,
  ChefHat,
  Heart,
  LogOut,
  Edit2,
  Check,
  AlertCircle,
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');

  const [myRecipesCount, setMyRecipesCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyRecipesCount = async () => {
      try {
        const response = await api.get('/api/recipes/my-recipes');
        setMyRecipesCount(response.data.length);
      } catch (err) {
        console.error('Error fetching my recipes:', err);
      } finally {
        setLoadingCount(false);
      }
    };

    fetchMyRecipesCount();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await api.put('/api/auth/profile', {
        name,
        bio,
        profilePhoto,
      });

      // Update AuthContext user details
      updateUser(response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex-grow w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card Summary */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="glass p-6 rounded-3xl text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

            {/* Avatar */}
            <div className="relative w-28 h-28 mx-auto mb-4">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-2 border-accent shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-full h-full rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent shadow-lg"
                style={user.profilePhoto ? { display: 'none' } : {}}
              >
                <span className="text-4xl font-extrabold text-accent uppercase">
                  {user.name ? user.name.charAt(0) : 'U'}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 truncate">{user.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 truncate">{user.email}</p>

            {user.bio && (
              <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-6 border-t border-black/5 dark:border-white/5 pt-4 leading-relaxed">
                "{user.bio}"
              </p>
            )}

            {/* Counts */}
            <div className="grid grid-cols-2 gap-4 border-t border-black/5 dark:border-white/5 pt-4 mb-6">
              <div
                onClick={() => navigate('/my-recipes')}
                className="glass glass-hover rounded-2xl p-3 cursor-pointer group"
              >
                <ChefHat className="w-5 h-5 text-accent mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="block text-lg font-extrabold text-gray-700 dark:text-white">
                  {loadingCount ? '...' : myRecipesCount}
                </span>
                <span className="text-xxs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">Recipes</span>
              </div>

              <div
                onClick={() => navigate('/favourites')}
                className="glass glass-hover rounded-2xl p-3 cursor-pointer group"
              >
                <Heart className="w-5 h-5 text-accent mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="block text-lg font-extrabold text-gray-700 dark:text-white">
                  {user.favourites ? user.favourites.length : 0}
                </span>
                <span className="text-xxs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">Favourites</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-3 btn-premium text-rose-500 hover:text-rose-600 font-bold text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Account</span>
            </button>
          </div>
        </div>

        {/* Edit / View Form Details */}
        <div className="md:col-span-2">
          <div className="glass p-8 rounded-3xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5 dark:border-white/5">
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center space-x-2">
                <User className="w-6 h-6 text-accent" />
                <span>Account Profile</span>
              </h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold btn-premium text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {error && (
              <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl mb-6 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 text-accent p-4 rounded-2xl mb-6 text-sm">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2 flex items-center space-x-1">
                    <User className="w-4 h-4 text-accent" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-premium"
                    placeholder="Update your name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2 flex items-center space-x-1">
                    <Camera className="w-4 h-4 text-accent" />
                    <span>Profile Photo URL</span>
                  </label>
                  <input
                    type="url"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                    className="input-premium"
                    placeholder="https://images.unsplash.com/... or profile image link"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2 flex items-center space-x-1">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Short Bio</span>
                  </label>
                  <textarea
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="input-premium resize-none"
                    placeholder="Tell the community about your culinary journey, favorite styles..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-black/5 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name);
                      setBio(user.bio || '');
                      setProfilePhoto(user.profilePhoto || '');
                    }}
                    className="px-5 py-2.5 btn-premium text-sm font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-1.5 px-5 py-2.5 btn-primary-premium rounded-xl disabled:opacity-50 cursor-pointer text-sm"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 glass rounded-2xl">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium">Display Name</h3>
                    <p className="text-base font-bold text-gray-700 dark:text-white">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 glass rounded-2xl">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email Address</h3>
                    <p className="text-base font-bold text-gray-700 dark:text-white">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 glass rounded-2xl">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium">Biography</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed whitespace-pre-line">
                      {user.bio || "No biography provided yet. Click 'Edit Profile' to add one!"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
