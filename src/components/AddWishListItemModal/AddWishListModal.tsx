'use client';

import { GiftType } from '@/types/types';
import { currencyType } from '@/types/types';

import { ChangeEvent, useCallback, useState } from 'react';

import { z } from 'zod';

import { CurrencyDropDown } from '../CurrencyDropdown/CurrencyDropDown';
import { ModalInput } from '../ui/ModalInput';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Modal } from '../ui/modal';
import { PriorityDropDown } from './ui/PriorityDropDown';

const giftSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(0, { message: 'Price must be non-negative' }),
  url: z.string().url({ message: 'Must be a valid URL' }),
  priority: z.enum(['High', 'Medium', 'Low']),
  reservedBy: z.string().optional().nullable(),
});

export const AddWishlistItemModal = ({
  closeModal,
  isOpen,
  onAddGift,
}: {
  closeModal: () => void;
  isOpen: boolean;
  onAddGift: (giftData: GiftType) => Promise<unknown>;
}) => {
  const [giftData, setGiftData] = useState<GiftType>({
    name: '',
    price: 0,
    url: '',
    priority: 'Low',
    currency: 'USD',
    reservedBy: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GiftType, string>>>(
    {},
  );

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

    try {
      await onAddGift(giftData);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      closeModal();
      setGiftData({
        name: '',
        price: 0,
        url: '',
        priority: 'Low',
        currency: 'USD',
        reservedBy: null,
      });
      setErrors({});
    }
  }, [giftData, onAddGift, closeModal]);

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
          onClick={() => {
            handleAddGift();
          }}
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
        <div className="flex gap-2 items-end flex-1 justify-between">
          <ModalInput
            className="flex-1"
            inputId="price"
            inputValue={giftData.price.toString()}
            labelText="Price"
            error={errors.price}
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) return;
              handleChange('price', Number(e.target.value));
            }}
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
