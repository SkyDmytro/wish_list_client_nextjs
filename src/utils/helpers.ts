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
      });
      return response;
    } catch (error) {
      toast({
        title: 'Error',
        description: errorMessage ?? 'An error occurred',
        variant: 'destructive',
      });
      return error;
    }
  };
};
