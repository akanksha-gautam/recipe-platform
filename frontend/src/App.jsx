import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import EditRecipe from './pages/EditRecipe';
import Favourites from './pages/Favourites';
import Explore from './pages/Explore';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-transparent text-gray-300 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route
                  path="/add-recipe"
                  element={
                    <ProtectedRoute>
                      <AddRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-recipes"
                  element={
                    <ProtectedRoute>
                      <MyRecipes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-recipe/:id"
                  element={
                    <ProtectedRoute>
                      <EditRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favourites"
                  element={
                    <ProtectedRoute>
                      <Favourites />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-500 bg-white/5 mt-12 transition-colors duration-300">
              <p>&copy; {new Date().getFullYear()} Recipify. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
