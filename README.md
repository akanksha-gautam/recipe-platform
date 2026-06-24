# Recipify 🍳

[![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind%20CSS-v3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933.svg?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.0-000000.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Recipify is a modern, full-stack recipe sharing platform featuring a gorgeous glassmorphism and neumorphism theme with seamless light and dark mode support. Users can discover, create, update, delete, search, and favourite delicious recipes from around the globe, complete with interactive video guides powered by YouTube embeds.

---

## ✨ Features

- **🔐 Robust User Authentication**: Secure user registration and login with JWT (JSON Web Tokens) and password hashing via `bcryptjs`. Custom profile views with editable user bios.
- **📝 Complete Recipe CRUD**: Registered users can publish, edit, and delete their own recipes—specifying ingredients, step-by-step instructions, category, cooking time, YouTube video URL, and descriptive tags.
- **🔍 Advanced Search & Filter System**: Real-time MongoDB text-based search, case-insensitive category filtering (Breakfast, Appetizers, Main Course, Desserts, Salad, Soup, Beverages, Snacks), and maximum cook time limits.
- **🎥 YouTube Embed & Thumbnail Extraction**: Automatically extracts video IDs from both standard and shortened YouTube URLs (e.g. `youtube.com` or `youtu.be`) to show embedded videos and load recipe cover thumbnails dynamically.
- **❤️ Favourites Management**: Save and remove recipes from your personal favorites with a single click, synchronized instantly to the MongoDB database and viewable on a dedicated page.
- **🌓 Dynamic Light & Dark Mode**: Fluid layout transition with theme persistence via React Context API, matching system or custom preferences.
- **🎨 Premium Visuals**: Responsive design featuring glassmorphism cards, premium input fields, harmonious color palettes, smooth hover micro-animations, and clean icons powered by Lucide React.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)**: Component-based UI library
- **Vite**: Ultra-fast next-generation frontend toolchain
- **Tailwind CSS v3**: Utility-first CSS styling
- **React Router DOM (v7)**: Client-side routing & protected routes
- **Axios**: Promised-based HTTP client with authorization interceptors
- **Lucide React**: Clean & modern SVG icons

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js (v5)**: Backend web application framework
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM)
- **JWT (jsonwebtoken)**: Secure token-based user authentication sessions
- **bcryptjs**: Password hashing and verification
- **Cloudinary**: Cloud image upload and hosting (configurable)

---

## 📁 Folder Structure

```
Recipe-Platform/
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── Recipe.js           # Mongoose Recipe Schema
│   └── User.js             # Mongoose User Schema
├── routes/
│   ├── auth.js             # Authentication routes (login, register, profile updates)
│   └── recipes.js          # Recipe routes (CRUD, search, favourites)
├── seed.js                 # Seed script to populate 45 standard/Indian/international recipes
├── server.js               # Node/Express API entry point
├── .env                    # Environment variables file
├── package.json            # Backend dependencies & configuration
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js    # Axios setup with bearer token request interceptor
    │   ├── components/
    │   │   ├── Navbar.jsx          # Glassmorphic responsive header with theme toggle
    │   │   ├── ProtectedRoute.jsx  # Client-side route guard
    │   │   └── RecipeCard.jsx      # Card component with YouTube thumbnail preview
    │   ├── context/
    │   │   ├── AuthContext.jsx     # Global authentication and profile context
    │   │   └── ThemeContext.jsx    # Theme toggle context (light/dark mode)
    │   ├── pages/
    │   │   ├── AddRecipe.jsx       # Recipe submission form with dynamic lists
    │   │   ├── EditRecipe.jsx      # Recipe modification page
    │   │   ├── Explore.jsx         # Search, category filter & search listing panel
    │   │   ├── Favourites.jsx      # List of user's favorited recipes
    │   │   ├── Home.jsx            # Platform home page with latest recipes
    │   │   ├── Login.jsx           # Clean glassmorphism login UI
    │   │   ├── MyRecipes.jsx       # Managed personal recipes listing
    │   │   ├── Profile.jsx         # User profile manager
    │   │   ├── RecipeDetail.jsx    # Detailed recipe instructions and video guides
    │   │   └── Register.jsx        # Registration form
    │   ├── App.css
    │   ├── App.jsx                 # Routing and layout structures
    │   ├── index.css               # Core styling tokens & glassmorphic system
    │   └── main.jsx                # React entry point
    ├── package.json                # Frontend package configurations
    ├── tailwind.config.js          # Tailwind CSS settings
    └── vite.config.js              # Vite bundler configurations
```

---

## 🚀 Getting Started

Follow these steps to set up and run Recipify on your local machine.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)
- **MongoDB** (A running local MongoDB instance or a MongoDB Atlas connection string)

### 1. Clone & Install Dependencies
Navigate into the project root and install backend dependencies:
```bash
npm install
```

Navigate into the frontend directory and install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

### 2. Configure Environment Variables
Create a file named `.env` in the root directory:
```bash
# In the root directory (Recipe-Platform/)
touch .env
```
Add your configuration values as detailed in the [Environment Variables](#-environment-variables) section below.

### 3. Seed the Database
To populate the database with a rich set of 45 preset recipes (Indian, Chinese, Italian, Continental, etc.), run the seed script from the root directory:
```bash
node seed.js
```

### 4. Start the Application
You can run both the frontend and backend servers concurrently.

**Start the Backend API Server (from the root directory):**
```bash
node server.js
```
*The API will start running on http://localhost:5000.*

**Start the Frontend Dev Server:**
Open a new terminal, navigate to the `frontend` folder, and start Vite:
```bash
cd frontend
npm run dev
```
*The web app will run locally on http://localhost:5173.*

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Backend server port
PORT=5000

# MongoDB Connection String (Atlas SRV or Local connection)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/recipedb

# Secret key used for signing JWT Tokens
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Credentials (Optional / Future integration for uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🔌 API Endpoints

### Authentication & Profile (`/api/auth`)
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register a new user |
| **POST** | `/api/auth/login` | Public | Authenticate user & return token |
| **PUT** | `/api/auth/profile` | Private | Update logged-in user profile (name, bio, photo) |

### Recipes (`/api/recipes`)
| HTTP Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/recipes` | Public | Get all recipes (supports query params: `search`, `category`, `maxTime`) |
| **GET** | `/api/recipes/:id` | Public | Get details of a single recipe by its ID |
| **POST** | `/api/recipes` | Private | Create a new recipe |
| **PUT** | `/api/recipes/:id` | Private | Update an existing recipe (author only) |
| **DELETE** | `/api/recipes/:id` | Private | Delete a recipe (author only) |
| **GET** | `/api/recipes/my-recipes` | Private | Get recipes created by the authenticated user |
| **GET** | `/api/recipes/favourites` | Private | Get authenticated user's favourited recipes |
| **POST** | `/api/recipes/:id/favourite` | Private | Toggle favourite status of a recipe |

---

## 📸 Screenshots

> [!NOTE]
> Screenshots showing the responsive interface, recipe lists, and interactive screens will be added here.

*Place screenshot images here:*
- **Home Page**: `![Home Page](https://via.placeholder.com/800x450?text=Recipify+Home+Page)`
- **Explore & Search Panel**: `![Explore Page](https://via.placeholder.com/800x450?text=Recipify+Explore+Page)`
- **Recipe Detail with YouTube Guide**: `![Recipe Details](https://via.placeholder.com/800x450?text=Recipify+Recipe+Detail)`
- **Create Recipe Form**: `![Create Recipe](https://via.placeholder.com/800x450?text=Recipify+Create+Recipe)`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
