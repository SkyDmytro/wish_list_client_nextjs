import { createGiftRequest } from '@/api/giftRequests/giftRequests';
import { useToast } from '@/hooks/use-toast';
import { GiftItem } from '@/types/wishList';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Modal } from '../ui/modal';

type GiftType = Omit<GiftItem, '_id' | 'status'>;
type keys = keyof GiftType;
type values = GiftType[keyof GiftType];

const giftSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(0, { message: 'Price must be non-negative' }),
  url: z.string().url({ message: 'Must be a valid URL' }),
  priority: z.enum(['High', 'Medium', 'Low']),
});

export const AddWishlistModal = ({
  closeModal,
  isOpen,
  wishlistId,
}: {
  closeModal: () => void;
  isOpen: boolean;
  wishlistId: string;
}): JSX.Element => {
  const [giftData, setGiftData] = useState<GiftType>({
    name: '',
    price: 0,
    url: '',
    priority: 'Low',
  });
  const [errors, setErrors] = useState<Record<keys, string | null>>({
    name: null,
    price: null,
    url: null,
    priority: null,
  });

  const { toast } = useToast();
  const { data: session } = useSession();

  const handleAddGift = async () => {
    const validationResult = giftSchema.safeParse(giftData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors({
        name: fieldErrors.name?._errors[0] ?? null,
        price: fieldErrors.price?._errors[0] ?? null,
        url: fieldErrors.url?._errors[0] ?? null,
        priority: null,
      });
      return;
    }

    try {
      await createGiftRequest(
        {
          ...giftData,
          status: 'Available',
          wishListId: wishlistId,
          userId: session?.user?._id,
        },
        session?.user?.token as string,
      );
      toast({
        title: 'Success',
        description: 'Gift added successfully',
        variant: 'default',
      });
    } catch (e: unknown) {
      toast({
        title: 'Something went wrong',
        description: (e.message as string) || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setGiftData({
        name: '',
        price: 0,
        url: '',
        priority: 'Low',
      });
      setErrors({
        name: null,
        price: null,
        url: null,
        priority: null,
      });
      window.location.reload();
      closeModal();
    }
  };

  const handleChange = (key: keys, value: values) => {
    setGiftData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Add new Gift"
      actions={
        <Button
          onClick={handleAddGift}
          className="mt-4 bg-purple-600 hover:bg-purple-700 w-full"
        >
          Add Gift
        </Button>
      }
      key={'dsadsa'}
    >
      <div className="flex flex-col gap-2">
        <ModalInput
          inputId="giftName"
          inputValue={giftData.name}
          labelText="Name"
          error={errors.name}
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
        />
        <ModalInput
          inputId="price"
          inputValue={giftData.price}
          labelText="Price"
          error={errors.price}
          onChange={(e) => {
            handleChange('price', Number(e.target.value));
          }}
        />
        <ModalInput
          inputId="link"
          inputValue={giftData.url}
          labelText="Link"
          error={errors.url}
          onChange={(e) => {
            handleChange('url', e.target.value);
          }}
        />
        <div className="space-y-2">
          <Label
            className="text-sm font-medium text-gray-300"
            htmlFor="priority"
          >
            Priority
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full justify-between bg-[#1a1f29] text-gray-200 border-gray-700 hover:bg-[#252b38]"
                variant="outline"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getPriorityColor(giftData.priority)}`}
                  />
                  {giftData.priority}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#1a1f29] border-gray-700"
              align="end"
            >
              <DropdownMenuItem
                onClick={() => handleChange('priority', 'High')}
                className="hover:bg-[#252b38] text-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  High
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChange('priority', 'Medium')}
                className="hover:bg-[#252b38] text-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Medium
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChange('priority', 'Low')}
                className="hover:bg-[#252b38] text-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Low
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Modal>
  );
};

interface ModalInputProps {
  labelText: string;
  inputValue: values;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
  error?: string | null;
  prefix?: string;
}

const ModalInput = ({
  labelText,
  inputValue,
  onChange,
  inputId,
  error,
  prefix,
}: ModalInputProps) => {
  return (
    <div className="space-y-2">
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
          className={`w-full bg-[#1a1f29] text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500 ${
            prefix ? 'pl-7' : ''
          }`}
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
