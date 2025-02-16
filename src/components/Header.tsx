import React from "react";
import { LogOut, User as UserIcon, Sun, Moon, Bell } from "lucide-react";
import { useStore } from "../store";
import { formatDistanceToNow } from "date-fns";

export const Header = ({ onViewProfile, onStartChat }) => {
  const {
    currentUser,
    setCurrentUser,
    theme,
    toggleTheme,
    notifications,
    markNotificationAsRead,
  } = useStore();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const userNotifications = notifications
    .filter((n) => n.userId === currentUser?.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    if (notification.type === "message") {
      onStartChat(notification.fromUserId);
    } else {
      onViewProfile(notification.fromUserId);
    }
    setShowNotifications(false);
  };

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
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                  <div className="p-3 border-b dark:border-gray-700">
                    <h3 className="font-semibold dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {userNotifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      userNotifications.map((notification) => {
                        const fromUser = useStore
                          .getState()
                          .users.find((u) => u.id === notification.fromUserId);
                        if (!fromUser) return null;

                        let content = "";
                        switch (notification.type) {
                          case "like":
                            content = "liked your post";
                            break;
                          case "comment":
                            content = "commented on your post";
                            break;
                          case "message":
                            content = "sent you a message";
                            break;
                        }

                        return (
                          <button
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className={`w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 ${
                              !notification.read
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : ""
                            }`}
                          >
                            <img
                              src={fromUser.avatar}
                              alt={fromUser.name}
                              className="w-10 h-10 object-cover rounded-full"
                            />
                            <div className="flex-1 text-left">
                              <p className="text-sm dark:text-white">
                                <span className="font-medium">
                                  {fromUser.name}
                                </span>{" "}
                                {content}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDistanceToNow(
                                  new Date(notification.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="font-medium dark:text-white">
                  {currentUser.name}
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setShowNotifications(false);
                }}
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
};
