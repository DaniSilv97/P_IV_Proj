# SmartSprout Solutions - React Developer Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Folder Structure](#folder-structure)
4. [Core Components](#core-components)
5. [Context Providers](#context-providers)
6. [Routing System](#routing-system)
7. [Styling Approach](#styling-approach)
8. [API Integration](#api-integration)
9. [Socket.IO Integration](#socketio-integration)
10. [Development Guidelines](#development-guidelines)

## 🚀 Project Overview

**SmartSprout Solutions** is an agricultural management platform that provides farmers with weather monitoring, field management, and actionable insights. The frontend is built with React and uses modern development practices including context providers, protected routes, and real-time data updates.

### Key Features
- User authentication (login/register)
- Field management with CRUD operations
- Real-time weather monitoring via Socket.IO
- Interactive weather charts and forecasts
- Responsive design with Tailwind CSS
- Protected routing based on authentication state

## 🏗️ Architecture

The application follows a component-based architecture with clear separation of concerns:

```
Frontend (React)
├── Authentication Layer (AuthContext)
├── Real-time Communication (SocketProvider)
├── Routing Layer (React Router)
├── UI Components
└── Views/Pages
```

### Technology Stack
- **React 18** - Component library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Recharts** - Data visualization
- **FontAwesome** - Icon library
- **PropTypes** - Runtime type checking

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── BaseButton.jsx
│   ├── ModalBase.jsx
│   ├── RouteAuth.jsx
│   ├── WeatherDisplay.jsx
│   └── ...
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   └── SocketProvider.jsx
├── layouts/            # Layout components
│   └── BaseLayout.jsx
├── views/              # Page components
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── MyFields/
│   └── ...
├── assets/             # Static assets (images)
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🧩 Core Components

### BaseButton Component
**Location:** `src/components/BaseButton.jsx`

A reusable button component with consistent styling and hover effects.

```jsx
// Usage example
<BaseButton onClick={handleClick} className="additional-classes">
  Button Text
</BaseButton>
```

**Props:**
- `children`: React nodes to render inside button
- `onClick`: Click handler function
- `className`: Additional CSS classes

### ModalBase Component
**Location:** `src/components/ModalBase.jsx`

A modal wrapper that provides consistent overlay styling.

```jsx
// Usage example
<ModalBase>
  <div className="modal-content">
    // Modal content here
  </div>
</ModalBase>
```

### WeatherDisplay Component
**Location:** `src/components/WeatherDisplay.jsx`

Displays current weather information using data from SocketProvider.

**Features:**
- Real-time weather updates
- Weather icons
- Temperature and humidity display
- Error handling for missing data

### RouteAuth Components
**Location:** `src/components/RouteAuth.jsx`

Three route protection components:
- `ProtectedRoute`: Requires user authentication
- `PublicRoute`: Only accessible when not authenticated
- `OpenRoute`: No restrictions

## 🔄 Context Providers

### AuthContext
**Location:** `src/contexts/AuthContext.jsx`

Manages user authentication state throughout the application.

**State:**
- `user`: Current user object or null
- `checkedSession`: Boolean indicating if session check is complete

**Methods:**
- `setUser`: Updates user state
- Session validation on app initialization

### SocketProvider
**Location:** `src/contexts/SocketProvider.jsx`

Handles Socket.IO connection and real-time weather updates.

**Features:**
- Automatic connection when user is authenticated
- Real-time weather data reception
- Connection lifecycle management
- Proper cleanup on unmount

## 🛣️ Routing System

The application uses React Router with nested routes and protection:

```
/ (OpenRoute)
├── /login (PublicRoute)
├── /register (PublicRoute)
└── /fields (ProtectedRoute)
    ├── / (ProtectedRoute) - MyFields list
    └── /:id (ProtectedRoute) - Individual field view
```

### Route Protection Logic
- **Public Routes**: Only accessible when user is NOT logged in
- **Protected Routes**: Only accessible when user IS logged in
- **Open Routes**: Accessible regardless of authentication state

## 🎨 Styling Approach

The project uses **Tailwind CSS** with custom configuration:

### Custom Colors (tailwind.config.js)
```javascript
colors: {
  'main': '#4caf50',
  'main-hover': '#388e3c',
  'secondary': '#a8e6cf',
  'secondary-hover': '#81c784'
}
```

### Animation Classes
Custom CSS animations are defined for:
- Fade effects
- Slide transitions
- Floating elements
- Loading spinners

## 🌐 API Integration

### Authentication Endpoints
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/session` - Session validation

### Field Management Endpoints
- `GET /api/fields` - Get user's fields
- `GET /api/fields/:id` - Get specific field
- `POST /api/fields/create` - Create new field
- `DELETE /api/fields/:id` - Delete field

### Request Configuration
All API requests include:
```javascript
credentials: 'include'  // For session cookies
```

## 📡 Socket.IO Integration

### Connection Management
```javascript
// Automatic connection when user logs in
socketRef.current = io('http://localhost:5000', {
  withCredentials: true,
});
```

### Event Handlers
- `connect`: Connection established
- `disconnect`: Connection lost
- `weather_update`: Real-time weather data

## 📋 Development Guidelines

### Component Development
1. **Always use PropTypes** for type checking
2. **Follow naming conventions**: PascalCase for components
3. **Implement proper error boundaries**
4. **Use functional components with hooks**

### State Management
1. **Use Context for global state** (auth, socket)
2. **Local state for component-specific data**
3. **Proper cleanup in useEffect hooks**

### Styling Guidelines
1. **Use Tailwind utility classes**
2. **Custom CSS only when necessary**
3. **Maintain responsive design principles**
4. **Use semantic HTML elements**

### API Integration Best Practices
1. **Always handle errors gracefully**
2. **Show loading states during requests**
3. **Use try-catch blocks for async operations**
4. **Validate responses before using data**

### File Organization
1. **Group related components in folders**
2. **Separate concerns (components vs views)**
3. **Use index files for cleaner imports**
4. **Keep assets organized by type**

## 🔧 Common Patterns

### Form Handling
```javascript
const [formData, setFormData] = useState({
  field: '',
  // ... other fields
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

### API Request Pattern
```javascript
const fetchData = async () => {
  try {
    const res = await fetch('/api/endpoint', {
      credentials: 'include',
    });
    
    if (res.ok) {
      const data = await res.json();
      // Handle success
    } else {
      // Handle error response
    }
  } catch (err) {
    // Handle network error
  }
};
```

### Modal State Management
```javascript
const [isModalOpen, setModalState] = useState(false);

const openModal = () => setModalState(true);
const closeModal = () => setModalState(false);
```

## 🐛 Debugging Tips

1. **Check browser console** for JavaScript errors
2. **Use React Developer Tools** for component inspection
3. **Monitor network tab** for API request issues
4. **Verify Socket.IO connection** in browser dev tools
5. **Check authentication state** in AuthContext

## 🚀 Performance Considerations

1. **Lazy load components** for large applications
2. **Memoize expensive calculations** with useMemo
3. **Optimize re-renders** with useCallback
4. **Implement proper cleanup** in useEffect
5. **Use production builds** for deployment

---