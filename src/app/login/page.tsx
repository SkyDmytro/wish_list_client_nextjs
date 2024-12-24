'use client';

// import { loginUserRequest } from '@/api/login/loginUserRequest';
import { loginUserRequest } from '@/api/login/loginUserRequest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/schemas/userLogin.schema';

import { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const zodErrors = parsed.error.flatten().fieldErrors;
      setErrors(zodErrors);
      return;
    }

    try {
      const response = await loginUserRequest(parsed.data);
      localStorage.setItem('jwt', response.token);
      router.push(`/users/${response._id}`);
    } catch (e) {
      console.error(e);
      throw new Error(e instanceof Error ? e.message : 'An error occurred');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                className={`text-sm font-medium ${
                  errors.email ? 'text-red-700' : 'text-gray-700'
                }`}
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
              />
              {errors.email?.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>

            <div>
              <Label
                className={`text-sm font-medium ${
                  errors.password ? 'text-red-700' : 'text-gray-700'
                }`}
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className={`mt-1 block w-full rounded-md shadow-sm 
                  ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
              />
              {errors.password?.map((error, index) => (
                <p key={index} className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
