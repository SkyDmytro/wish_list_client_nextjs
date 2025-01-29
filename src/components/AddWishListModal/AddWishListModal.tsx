'use client';

import { createGiftRequest } from '@/api/giftRequests/giftRequests';
import { createGiftRequestBodyType } from '@/types/requests';
import { GiftItem, GiftResponse, currencyType } from '@/types/wishList';
import { withToastAsync } from '@/utils/helpers';

import { ChangeEvent, useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';
import { z } from 'zod';

import { CurrencyDropDown } from '../CurrencyDropdown/CurrencyDropDown';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Modal } from '../ui/modal';
import { ModalInput } from './ui/ModalInput';
import { PriorityDropDown } from './ui/PriorityDropDown';

type GiftType = Omit<GiftItem, '_id' | 'status'> & {
  currency: currencyType;
};

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
}) => {
  const [giftData, setGiftData] = useState<GiftType>({
    name: '',
    price: 0,
    url: '',
    priority: 'Low',
    currency: 'USD',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GiftType, string>>>(
    {},
  );

  const { data: session } = useSession();

  const createGiftRequestWithToast = withToastAsync<
    GiftResponse,
    [createGiftRequestBodyType, string?]
  >(createGiftRequest, 'Gift added successfully', 'Error adding gift');

  const handleAddGift = useCallback(async () => {
    const validationResult = giftSchema.safeParse(giftData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        price: fieldErrors.price?.[0],
        url: fieldErrors.url?.[0],
      });
      return;
    }

    await createGiftRequestWithToast(
      {
        ...giftData,
        status: 'Available',
        wishListId: wishlistId,
        userId: session?.user?._id,
      },
      session?.user?.token as string,
    ).finally(() => {
      setGiftData({
        name: '',
        price: 0,
        url: '',
        priority: 'Low',
        currency: 'USD',
      });
      setErrors({});
      window.location.reload();
      closeModal();
    });
  }, [
    giftData,
    createGiftRequestWithToast,
    wishlistId,
    session?.user?._id,
    session?.user?.token,
    closeModal,
  ]);

  const handleChange = useCallback(
    (key: keyof GiftType, value: string | number) => {
      setGiftData((prev) => ({
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
      title="Add new Gift"
      actions={
        <Button
          onClick={handleAddGift}
          className="mt-4 bg-purple-600 hover:bg-purple-700 w-full"
        >
          Add Gift
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <ModalInput
          inputId="giftName"
          inputValue={giftData.name}
          labelText="Name"
          error={errors.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('name', e.target.value)
          }
        />
        <div className="flex gap-2 items-end flex-1">
          <ModalInput
            inputId="price"
            inputValue={giftData.price}
            labelText="Price"
            error={errors.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
          />
          <div className="w-1/3">
            <CurrencyDropDown
              onChange={(newCurrency: string) =>
                handleChange('currency', newCurrency as currencyType)
              }
              currency={giftData.currency}
            />
          </div>
        </div>
        <ModalInput
          inputId="link"
          inputValue={giftData.url}
          labelText="Link"
          error={errors.url}
          onChange={(e) => handleChange('url', e.target.value)}
        />
        <div className="space-y-2">
          <Label
            className="text-sm font-medium text-gray-300"
            htmlFor="priority"
          >
            Priority
          </Label>
          <PriorityDropDown
            prirority={giftData.priority}
            handleChange={(value: string) => {
              handleChange('priority', value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
