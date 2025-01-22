import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

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

interface GiftType {
  giftName: string;
  price: number;
  link: string;
  priority: string;
}
type keys = keyof GiftType;
type values = GiftType[keyof GiftType];

/**
 * A modal that prompts the user to create a new wishlist.
 *
 * @param {{
 *   closeModal: () => void;
 *   openModal: () => void;
 *   isOpen: boolean;
 * }} props
 * @returns {JSX.Element}
 */
export const AddWishlistModal = ({
  closeModal,
  isOpen,
}: {
  closeModal: () => void;
  isOpen: boolean;
}): JSX.Element => {
  const [giftData, setGiftData] = useState<GiftType>({
    giftName: '',
    price: 0,
    link: '',
    priority: 'Low',
  });

  const handleAddGift = () => {
    console.log('add', giftData);
    closeModal();
  };

  const handleChange = (key: keys, value: values) => {
    setGiftData((prev) => ({
      ...prev,
      [key]: value,
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
          inputValue={giftData.giftName}
          labelText="Name"
          onChange={(e) => {
            handleChange('giftName', e.target.value);
          }}
        />
        <ModalInput
          inputId="price"
          inputValue={giftData.price}
          labelText="Price"
          onChange={(e) => {
            handleChange('price', e.target.value);
          }}
        />
        <ModalInput
          inputId="link"
          inputValue={giftData.link}
          labelText="Link"
          onChange={(e) => {
            handleChange('link', e.target.value);
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
  prefix?: string;
}

const ModalInput = ({
  labelText,
  inputValue,
  onChange,
  inputId,
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
      </div>
    </div>
  );
};
