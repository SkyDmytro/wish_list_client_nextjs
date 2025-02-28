import { toast } from '@/hooks/use-toast';

export const withToastAsync = <T, R extends unknown[]>(
  request: (...args: R) => Promise<T>,
  successMessage?: string,
  errorMessage?: string,
) => {
  return async (...args: R) => {
    try {
      const response = await request(...args);
      toast({
        title: 'Success',
        description: successMessage ?? 'Success',
        duration: 3000,
      });
      return response;
    } catch (error) {
      toast({
        title: 'Error',
        description: errorMessage ?? 'An error occurred',
        variant: 'destructive',
        duration: 3000,
      });
      return error;
    }
  };
};

export const isUnderDevelopment = () => {
  const token = localStorage.getItem('dev');
  return token === 'true';
};
