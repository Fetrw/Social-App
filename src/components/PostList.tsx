import { useState } from "react";
import { Heart, MessageCircle, Hash } from "lucide-react";
import { useStore } from "../store";
import { Comment } from "../types";

export function PostList() {
  const { posts, users, currentUser, toggleLike, addComment, votePoll } =
    useStore();
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleAddComment = (postId: string) => {
    if (!currentUser || !commentText[postId]?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: commentText[postId].trim(),
      createdAt: new Date().toISOString(),
    };

    addComment(postId, newComment);
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={`tag-${tag}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <Hash className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const author = users.find((u) => u.id === post.userId);
          if (!author) return null;

          return (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium dark:text-white">
                      {author.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mb-4 dark:text-white">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="rounded-lg mb-4 max-h-96 w-full object-cover"
                  />
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={`post-${post.id}-tag-${tag}`}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        <Hash className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {post.poll && new Date(post.poll.endDate) > new Date() && (
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 dark:text-white">
                      {post.poll.question}
                    </h4>
                    <div className="space-y-2">
                      {post.poll.options.map((option) => {
                        const totalVotes = post.poll.options.reduce(
                          (sum, opt) => sum + opt.votes.length,
                          0
                        );
                        const percentage =
                          totalVotes === 0
                            ? 0
                            : Math.round(
                                (option.votes.length / totalVotes) * 100
                              );
                        const hasVoted =
                          currentUser && option.votes.includes(currentUser.id);

                        return (
                          <button
                            key={`poll-${post.id}-option-${option.id}`}
                            onClick={() =>
                              currentUser &&
                              votePoll(post.id, option.id, currentUser.id)
                            }
                            disabled={!currentUser}
                            className="w-full"
                          >
                            <div className="relative">
                              <div
                                className={`w-full p-2 rounded ${
                                  hasVoted
                                    ? "bg-blue-100 dark:bg-blue-900"
                                    : "bg-gray-100 dark:bg-gray-600"
                                }`}
                              >
                                <div
                                  className="absolute top-0 left-0 bottom-0 bg-blue-200 dark:bg-blue-800 rounded opacity-50"
                                  style={{ width: `${percentage}%` }}
                                />
                                <div className="relative flex justify-between">
                                  <span className="dark:text-white">
                                    {option.text}
                                  </span>
                                  <span className="dark:text-white">
                                    {percentage}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Poll ends{" "}
                      {new Date(post.poll.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      currentUser && toggleLike(post.id, currentUser.id)
                    }
                    className={`flex items-center gap-1 ${
                      currentUser && post.likes.includes(currentUser.id)
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    {post.likes.length}
                  </button>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments.length}
                  </div>
                </div>
              </div>
              {post.comments.length > 0 && (
                <div className="border-t dark:border-gray-700 px-4 py-3 space-y-3">
                  {post.comments.map((comment) => {
                    const commentAuthor = users.find(
                      (u) => u.id === comment.userId
                    );
                    if (!commentAuthor) return null;

                    return (
                      <div key={`comment-${comment.id}`} className="flex gap-2">
                        <img
                          src={commentAuthor.avatar}
                          alt={commentAuthor.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-sm dark:text-white">
                            <span className="font-medium">
                              {commentAuthor.name}
                            </span>{" "}
                            {comment.content}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {currentUser && (
                <div className="border-t dark:border-gray-700 px-4 py-3 flex gap-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="flex-1 text-sm border rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-4 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
