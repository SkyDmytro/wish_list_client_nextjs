'use client';
export const GoogleAuthButton = ({
  onClick,
}: {
  onClick: (provider: 'google') => void;
}) => {
  return (
    <button
      onClick={() => onClick('google')}
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-white hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <span className="text-black">Sign in with Google</span>
    </button>
  );
};
