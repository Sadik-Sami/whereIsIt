![WhereIsIt Logo](public/vite.png)

# WhereIsIt - Lost & Found Platform 🔍

[Visit Live Site]([URL](https://lost-and-found-245c3.web.app))

## 🌟 Overview

**WhereIsIt** is a modern, user-friendly platform designed to help people find their lost items and report found items. Built with React and styled with Tailwind CSS, it offers a seamless experience for users to connect and recover their belongings.

---

## ✨ Features

### 🔐 Authentication & User Management

- Email/Password authentication
- Google Sign-in integration
- User profile management
- Protected routes for authenticated users

### 📱 Core Functionality

#### Lost & Found Posts

- Create detailed posts with images
- Categorize items effectively
- Advanced search and filtering
- Real-time updates
- Pagination with customizable items per page

#### Item Recovery System

- Mark items as recovered
- Connect with item owners/finders
- Track recovery statistics
- Recovery confirmation process

### 🎨 UI/UX Features

#### Responsive Design

- Mobile-first approach
- Fluid layouts for all screen sizes
- Touch-friendly interfaces

#### Dark Mode

- System preference detection
- Manual toggle option
- Persistent user preference

#### Interactive Components

- Animated transitions
- Loading skeletons
- Toast notifications
- Modal dialogs
- Tooltips

### 📊 Dashboard & Management

- Personal posts management
- Post editing capabilities
- Recovery tracking
- Activity history

---

## 🛠️ Technical Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: React DatePicker
- **Notifications**: React Toastify

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sadik-Sami/whereIsIt.git
   cd whereis-it
   ```

````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
- `VITE_apiKey`: Firebase API Key
- `VITE_authDomain`: Firebase Auth Domain
- `VITE_projectId`: Firebase Project Id
- `VITE_storageBucket`: Firebase Storage Bucket
- `VITE_messagingSenderId`: Firebase Messaging Sender Id
- `VITE_appId`: Firebase App Id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🚀 Build & Deployment

1. Create a production build:

   ```bash
   npm run build
   ```

2. Preview the build:
   ```bash
   npm run preview
   ```

---

## 🔧 Configuration

### Environment Variables

- `VITE_apiKey`: Firebase API Key
- `VITE_authDomain`: Firebase Auth Domain
- `VITE_projectId`: Firebase Project Id
- `VITE_storageBucket`: Firebase Storage Bucket
- `VITE_messagingSenderId`: Firebase Messaging Sender Id
- `VITE_appId`: Firebase App Id

### Theming

- Custom color scheme in `tailwind.config.js`
- Dark mode configuration
- Typography settings

---

## 📱 Pages & Routes

- `/` - Home page with hero section and features
- `/lost-found` - Browse lost and found items
- `/add-post` - Create new post
- `/my-posts` - Manage personal posts
- `/recovered-items` - View recovered items
- `/login` - User authentication
- `/register` - New user registration
- `/post/:id` - Individual post details
- `/update-post/:id` - Edit existing post

---

## 🧩 Components

### Layout Components

- Navbar with dynamic navigation
- Footer with site information
- Error boundaries
- Loading states

### Feature Components

- Item cards with hover effects
- Search and filter system
- Pagination controls
- Modal dialogs
- Form components

### Utility Components

- Image upload/preview
- Date picker
- Toast notifications
- Loading skeletons

---

## 🔒 Security Features

- Protected routes
- JWT token management
- Form validation
- XSS protection
- CORS configuration

---

## 🧪 Testing

Run tests:

```bash
npm test
```

## 👥 Authors

- **Sadik Al Sami** -
[Visit GitHub](https://github.com/Sadik-Sami)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
````
