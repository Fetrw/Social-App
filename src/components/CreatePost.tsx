import React, { useState } from "react";
import { Image as ImageIcon, Send, Hash, BarChart2 } from "lucide-react";
import { useStore } from "../store";
import { Post } from "../types";

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1");
  const { currentUser, addPost } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: content.trim(),
      image: image.trim() || undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      poll: showPoll
        ? {
            question: pollQuestion,
            options: pollOptions.filter(Boolean).map((option) => ({
              id: Math.random().toString(36).substr(2, 9),
              text: option,
              votes: [],
            })),
            endDate: new Date(
              Date.now() + parseInt(pollDuration) * 24 * 60 * 60 * 1000
            ).toISOString(),
          }
        : undefined,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
    setContent("");
    setImage("");
    setTags("");
    setShowPoll(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setPollDuration("1");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows={3}
      />
      <div className="mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="flex-1 text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="flex-1 text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowPoll(!showPoll)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <BarChart2 className="w-4 h-4" />
          {showPoll ? "Remove Poll" : "Add Poll"}
        </button>

        {showPoll && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder="Poll question"
              className="w-full text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {pollOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...pollOptions];
                  newOptions[index] = e.target.value;
                  setPollOptions(newOptions);
                }}
                placeholder={`Option ${index + 1}`}
                className="w-full text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            ))}
            <button
              type="button"
              onClick={() => setPollOptions([...pollOptions, ""])}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              + Add Option
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Poll duration:
              </span>
              <select
                value={pollDuration}
                onChange={(e) => setPollDuration(e.target.value)}
                className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Post
        </button>
      </div>
    </form>
  );
};
