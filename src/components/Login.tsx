import { useStore } from "../store";

export const Login = () => {
  const { users, setCurrentUser } = useStore();

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Welcome to SocialApp
      </h2>
      <div className="space-y-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setCurrentUser(user)}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-left">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.bio}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
