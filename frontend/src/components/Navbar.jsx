import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ChefHat,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  Sun,
  Moon,
  Compass,
  Heart,
  User,
  ChevronDown,
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/5 px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-accent/10 p-2 rounded-xl border border-accent/20 group-hover:bg-accent/20 transition-all duration-300">
            <ChefHat className="h-6 w-6 text-accent" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-800 dark:text-white group-hover:text-accent transition-colors duration-300">
            Recipify
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive('/') ? 'text-accent' : 'text-gray-600 dark:text-gray-300 hover:text-accent'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/explore"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive('/explore') ? 'text-accent' : 'text-gray-600 dark:text-gray-300 hover:text-accent'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>

          <Link
            to="/add-recipe"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive('/add-recipe') ? 'text-accent' : 'text-gray-600 dark:text-gray-300 hover:text-accent'
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Recipe</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 btn-premium text-gray-600 dark:text-gray-300 hover:text-accent cursor-pointer"
            title="Toggle theme"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-emerald-600" />
            ) : (
              <Sun className="h-4 w-4 text-accent" />
            )}
          </button>

          {/* User Account / Auth Status */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 btn-premium rounded-full cursor-pointer"
              >
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-accent/30"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      const sibling = e.target.nextSibling;
                      if (sibling) sibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30"
                  style={user.profilePhoto ? { display: 'none' } : {}}
                >
                  <span className="text-xs font-bold text-accent uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-white max-w-[100px] truncate hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Avatar Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 glass rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2.5 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                    <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-white truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/my-recipes"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                  >
                    <ChefHat className="h-4 w-4" />
                    <span>My Recipes</span>
                  </Link>

                  <Link
                    to="/favourites"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Favourites</span>
                  </Link>

                  <div className="border-t border-black/5 dark:border-white/5 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all font-bold cursor-pointer text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-accent transition-all duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold rounded-xl btn-primary-premium cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
