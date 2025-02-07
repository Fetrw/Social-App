/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store";
import { Send } from "lucide-react";

interface ChatProps {
  userId: string;
}

export function Chat({ userId }: ChatProps) {
  const { users, currentUser, chats, sendMessage } = useStore();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPartner = users.find((u) => u.id === userId);

  if (!currentUser || !chatPartner) return null;

  const chatId = [currentUser.id, userId].sort().join("-");
  const chat = chats.find((c) => c.id === chatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(currentUser.id, userId, message.trim());
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-white">
          Chat with {chatPartner.name}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat?.messages.map((msg) => {
          const isCurrentUser = msg.fromUserId === currentUser.id;
          return (
            <div
              key={msg.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isCurrentUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
