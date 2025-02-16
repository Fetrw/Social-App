# Social Network App

A modern social network application built with React, TypeScript, and Zustand. This application demonstrates a full-featured social networking experience with a clean and responsive user interface.

# [DEMO](https://social-app-dusky-one.vercel.app/)

## Features

### User Management
- **Multiple User Profiles**
  - Switch between different user accounts
  - Personalized experience for each user
  - Automatic redirection to home page on account switch

### Posts and Interactions
- **Rich Post Creation**
  - Create text posts with images
  - Add tags to posts
  - Create polls with multiple options
  - Rich text formatting

- **Interactive Features**
  - Like and comment on posts
  - Vote in polls
  - Filter posts by tags
  - Search through posts

### Real-time Communication
- **Messaging System**
  - Direct messaging between users
  - Chat history preservation
  - Real-time message updates
  - Contact list management
  - Quick access to recent conversations

### Notifications
- **Real-time Notifications**
  - New message alerts
  - Like notifications
  - Comment notifications
  - Unread count indicator
  - Mark as read functionality

### Profile Features
- **Detailed User Profiles**
  - Profile information display
  - User's posts collection
  - Activity history
  - Profile customization
  - Location and website links

### Search & Discovery
- **Advanced Search**
  - Search posts by content
  - Filter by tags
  - Discover users
  - Find conversations

### Theme Support
- **Customizable Interface**
  - Light/Dark mode toggle
  - Persistent theme preference
  - Responsive design
  - Accessible UI elements

## Technology Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Project Structure

```
src/
├── components/        # React components
│   ├── Chat.tsx         # Chat interface
│   ├── ChatsPage.tsx    # Chats overview
│   ├── CreatePost.tsx   # Post creation
│   ├── Header.tsx       # App header with notifications
│   ├── Login.tsx        # User authentication
│   ├── PostList.tsx     # Posts display
│   └── Profile.tsx      # User profiles
├── store/            # Zustand store
│   └── index.ts        # State management
├── types/            # TypeScript definitions
├── App.tsx           # Main application
└── main.tsx         # Entry point
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Features in Detail

### Notifications System
- Real-time notifications for:
  - New messages
  - Post likes
  - Comments on posts
- Notification center in the header
- Unread count indicator
- Click-through to relevant content
- Mark as read functionality

### Chat System
- Direct messaging between users
- Chat history preservation
- Real-time updates
- Contact list
- Online status indicators
- Message notifications

### Post Management
- Create rich text posts
- Add images to posts
- Tag posts for categorization
- Create polls with multiple options
- Like and comment system
- Search and filter functionality

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request