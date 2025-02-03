'use client';

import { ModalInput } from '@/components/ui/ModalInput';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import { WishListDataType } from '@/types/types';

import { ChangeEvent, useCallback, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { z } from 'zod';

import { Label } from '../ui/label';

const wishlistSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  access: z.enum(['private', 'public']),
});

export const AddWishlistModal = ({
  closeModal,
  isOpen,
  onAddWishList,
}: {
  closeModal: () => void;
  isOpen: boolean;
  onAddWishList: (wishListData: WishListDataType) => Promise<unknown>;
}) => {
  const [wishlistData, setwishlistData] = useState<WishListDataType>({
    title: '',
    access: 'private',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof WishListDataType, string>>
  >({});

  const handleAddWishList = useCallback(async () => {
    const validationResult = wishlistSchema.safeParse(wishlistData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        access: fieldErrors.access?.[0],
      });
      return;
    }

    try {
      await onAddWishList(wishlistData);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      closeModal();
      setwishlistData({
        access: 'private',
        title: '',
      });
      setErrors({});
    }
  }, [closeModal, onAddWishList, wishlistData]);

  const handleChange = useCallback(
    (
      key: keyof WishListDataType,
      value: WishListDataType[keyof WishListDataType],
    ) => {
      setwishlistData((prev) => ({
        ...prev,
        [key]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [key]: null,
      }));
    },
    [],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Add new WishList"
      actions={
        <Button
          onClick={handleAddWishList}
          className="mt-4 bg-purple-600 hover:bg-purple-700 w-full"
        >
          Add WishList
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <ModalInput
          labelText="Title"
          inputValue={wishlistData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('title', e.target.value)
          }
          error={errors.title}
          inputId="title"
        />
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Access</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-full justify-between bg-[#1a1f29] text-gray-200 border-gray-700 hover:bg-[#252b38]"
                variant="outline"
              >
                <div className="flex items-center gap-2">
                  {wishlistData.access.charAt(0).toUpperCase() +
                    wishlistData.access.slice(1)}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#1a1f29] border-none "
              align="end"
            >
              <DropdownMenuItem
                key="Public"
                onClick={() => {
                  handleChange('access', 'public');
                }}
                className="hover:bg-[#252b38] text-gray-200"
              >
                Public
              </DropdownMenuItem>
              <DropdownMenuItem
                key="Private"
                onClick={() => {
                  handleChange('access', 'private');
                }}
                className="hover:bg-[#252b38] text-gray-200"
              >
                Private
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Modal>
  );
};
