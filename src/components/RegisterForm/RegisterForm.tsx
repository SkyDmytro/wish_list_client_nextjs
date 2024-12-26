'use client';

import { registerUserRequest } from '@/api/register/registerUserRequest';
import { registerSchema } from '@/schemas/userRegister.schema';

import { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const RegisterForm = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const parsed = registerSchema.safeParse({ name, email, password });
    console.log(parsed);
    if (!parsed.success) {
      const zodErrors = parsed.error.flatten().fieldErrors;
      setErrors(zodErrors);
      return;
    }

    try {
      const response = await registerUserRequest(parsed.data);
      localStorage.setItem('jwt', response.token);
      router.push(`/users/${response._id}`);
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'An error occurred');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label
            className={`text-sm font-medium ${
              errors.name ? 'text-red-700' : 'text-gray-700'
            }`}
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className={`mt-1 block w-full rounded-md shadow-sm 
                  ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
          />
          {errors.name?.map((error, index) => (
            <p key={index} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>

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
            placeholder="Create a password"
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
        Create Account
      </Button>
    </form>
  );
};
