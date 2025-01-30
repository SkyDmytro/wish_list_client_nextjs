'use client';

import { GiftType } from '@/types/types';
import { GiftItem, currencyType } from '@/types/wishList';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

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
});

export const EditGiftModal = ({
  closeModal,
  isOpen,
  onEditGift,
  CurrentGiftData,
}: {
  CurrentGiftData: GiftItem;
  closeModal: () => void;
  isOpen: boolean;
  onEditGift: (giftData: GiftItem) => Promise<unknown>;
}) => {
  const [giftData, setGiftData] = useState<GiftItem>(CurrentGiftData);
  const [errors, setErrors] = useState<Partial<Record<keyof GiftType, string>>>(
    {},
  );

  useEffect(() => {
    setGiftData(CurrentGiftData);
  }, [CurrentGiftData]);

  const handleEditGift = useCallback(async () => {
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
      await onEditGift(giftData);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'An error occurred',
      );
    } finally {
      closeModal();
      setErrors({});
    }
  }, [giftData, onEditGift, closeModal]);

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
      title="Edit Gift"
      actions={
        <Button
          onClick={handleEditGift}
          className="mt-4 bg-purple-600 hover:bg-purple-700 w-full"
        >
          Confirm
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
