import LoginForm from '@/components/LoginForm/LoginForm';

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white-600">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
