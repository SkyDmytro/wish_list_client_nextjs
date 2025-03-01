import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { ChangeEvent } from 'react';

/**
 * A form input component for the modal.
 *
 * @param {ModalInputProps} props
 * @returns {JSX.Element}
 */
export const ModalInput = ({
  labelText,
  inputValue,
  onChange,
  inputId,
  error,
  prefix,
  className,
  inputType = 'text',
}: {
  labelText: string;
  inputValue: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  error?: string;
  prefix?: string;
  className?: string;
  inputType?: 'text' | 'email' | 'password';
}): JSX.Element => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium text-gray-300" htmlFor={inputId}>
        {labelText}
      </Label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </span>
        )}
        <Input
          type={inputType}
          className={`w-full bg-[#1a1f29] text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500 ${prefix ? 'pl-7' : ''}`}
          placeholder={`Enter ${labelText.toLowerCase()}`}
          id={inputId}
          value={inputValue}
          onChange={onChange}
        />
        {error && <span className="text-red-300 text-sm">{error}</span>}
      </div>
    </div>
  );
};
