import { Spinner } from '@/components/Loading/Loading';

export const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8">
      <Spinner />
    </div>
  );
};
export default Loading;
