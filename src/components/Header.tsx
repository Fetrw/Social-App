import { LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import { useStore } from "../store";

export function Header() {
  const { currentUser, setCurrentUser, theme, toggleTheme } = useStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          SocialApp
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium dark:text-white">
                  {currentUser.name}
                </span>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          ) : (
            <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </div>
      </div>
    </header>
  );
}
