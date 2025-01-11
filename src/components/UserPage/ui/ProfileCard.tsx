export const ProfileCard = ({ name, date }: { name: string; date: string }) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 rounded-full bg-gray-800"></div>
        <div>
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <p className="text-gray-400">
            Member since {new Date(date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};
