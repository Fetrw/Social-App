import { useStore } from "../store";
import { Calendar, MapPin, Globe } from "lucide-react";
import { PostList } from "./PostList";

interface ProfileProps {
  userId: string;
}

export function Profile({ userId }: ProfileProps) {
  const { users, posts } = useStore();
  const user = users.find((u) => u.id === userId);
  const userPosts = posts.filter((post) => post.userId === userId);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
        <div className="px-6 pb-6">
          <div className="relative flex items-end -mt-16 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {new URL(user.website).hostname}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold dark:text-white">Posts</h2>
        <PostList posts={userPosts} />
      </div>
    </div>
  );
}
