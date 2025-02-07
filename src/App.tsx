import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { CreatePost } from './components/CreatePost';
import { PostList } from './components/PostList';
import { Profile } from './components/Profile';
import { Chat } from './components/Chat';

type View = 'feed' | 'profile' | 'chat';

function App() {
  const { currentUser, theme } = useStore();
  const [view, setView] = useState<View>('feed');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setView('profile');
  };

  const handleStartChat = (userId: string) => {
    setSelectedUserId(userId);
    setView('chat');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header onViewProfile={handleViewProfile} onStartChat={handleStartChat} />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {currentUser ? (
          <>
            {view === 'feed' && (
              <>
                <CreatePost />
                <PostList onViewProfile={handleViewProfile} />
              </>
            )}
            {view === 'profile' && selectedUserId && (
              <Profile userId={selectedUserId} />
            )}
            {view === 'chat' && selectedUserId && (
              <Chat userId={selectedUserId} />
            )}
          </>
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
}

export default App