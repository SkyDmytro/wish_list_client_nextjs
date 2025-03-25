'use cleint';

import { getRequest } from '@/api/requests';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { WishListDataType } from '@/types/types';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { useEffect, useMemo, useState } from 'react';

import { Edit, ExternalLink, Trash } from 'lucide-react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

import {
  createWishListRequestWithToast,
  deleteWishListRequestWithToast,
  editWishListRequestWithToast,
} from '../requests/wishListRequestsWishToast';
import { actionsType } from '../types/types';

export const useWishLists = (
  session: Session | null,
  isUserTheOwner: boolean,
  wishListOwner: UserType,
  currentPage: number,
  wishlists: wishList[],
) => {
  const [currentWishLists, setCurrentWishLists] =
    useState<wishList[]>(wishlists);
  const [wishListToEdit, setWishListToEdit] = useState<wishList | null>(null);
  const [wishListToDelete, setWishListToDelete] = useState<wishList | null>(
    null,
  );

  const router = useRouter();

  const {
    isOpen: isAddWishlistModalOpen,
    openModal: onOpenAddWishlistModal,
    closeModal: onCloseAddWishlistModal,
  } = useModal();

  const {
    isOpen: isEditWishlistModalOpen,
    openModal: onOpenEditWishlistModal,
    closeModal: onCloseEditWishlistModal,
  } = useModal();

  const {
    isOpen: isDeleteWishlistModalOpen,
    openModal: onOpenDeleteWishlistModal,
    closeModal: onCloseDeleteWishlistModal,
  } = useModal();

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchWishlists = async () => {
      try {
        const newWishLists = await getRequest<{
          items: wishList[];
          meta: unknown;
        }>(
          `${API_URL}${wishlistUrl}/${wishListOwner._id}/user?page=${currentPage}&pageSize=10`,
          session?.accessToken,
        );
        setCurrentWishLists(newWishLists.items);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
      }
    };

    fetchWishlists();
  }, [currentPage, session?.accessToken]);

  const wishlistTableActions: actionsType<wishList>[] = useMemo(
    () => [
      {
        component: () => (
          <Button
            variant="ghost"
            className="text-slate-400 hover:bg-slate-700 hover:text-slate-300 w-full flex justify-start"
          >
            <ExternalLink className="mr-2 h-2 w-2" />
            View
          </Button>
        ),
        onClick: (item) => () => {
          const id = item._id;
          router.push(`/wishlists/${id as string}`);
        },
        isVisible: () => true,
      },
      {
        component: () => (
          <Button
            variant="ghost"
            className=" text-slate-400 hover:bg-slate-700 hover:text-slate-300 w-full flex justify-start"
          >
            <Edit className="mr-2 h-2 w-2" />
            Edit Wish List
          </Button>
        ),
        onClick: (item) => () => {
          setWishListToEdit(item as wishList);
          onOpenEditWishlistModal();
        },
        isVisible: () => isUserTheOwner,
      },
      {
        component: () => (
          <Button
            variant="destructive"
            className="bg-red-500 text-white w-full flex justify-start"
          >
            <Trash className="mr-2 h-2 w-2" />
            Delete Wish List
          </Button>
        ),
        onClick: (item) => () => {
          setWishListToDelete(item as wishList);
          onOpenDeleteWishlistModal();
        },
        isVisible: () => isUserTheOwner,
      },
    ],
    [onOpenDeleteWishlistModal, onOpenEditWishlistModal, router],
  );

  const handleAddWishList = async (wishListData: WishListDataType) => {
    const newWishList = {
      title: wishListData.title,
      access: wishListData.access,
      owner: wishListOwner._id,
    };
    try {
      const result = await createWishListRequestWithToast(
        newWishList,
        session?.accessToken,
      );
      if (currentWishLists.length === 10) {
        setCurrentWishLists((prev) => [
          result as wishList,
          ...prev.toSpliced(-1),
        ]);
      } else {
        setCurrentWishLists((prev) => [result as wishList, ...prev]);
      }
      onCloseAddWishlistModal();
    } catch (error) {
      console.error('Error adding wish list:', error);
    }
  };

  const handleEditWishList = async (wishListData: WishListDataType) => {
    const newWishList = {
      ...wishListData,
      _id: wishListToEdit?._id as string,
    };
    try {
      const result = await editWishListRequestWithToast(
        wishListToEdit?._id as string,
        newWishList,
        session?.accessToken,
      );
      onCloseEditWishlistModal();
      setCurrentWishLists((prev) =>
        prev.map((wishlist) => {
          if (wishlist._id === (result as wishList)._id) {
            const newWl: wishList = {
              ...wishlist,
              ...(result as wishList),
              updatedAt: new Date().toISOString(),
            };
            return newWl;
          }
          return wishlist;
        }),
      );
    } catch (error) {
      console.error('Error editing wish list:', error);
    } finally {
      setWishListToEdit(null);
    }
  };

  const handeDeleteWishList = async () => {
    if (!wishListToDelete) return;
    if (!session) return;

    const reqBody = {
      wishListId: wishListToDelete?._id,
      userId: session.user._id,
    };

    try {
      await deleteWishListRequestWithToast(reqBody, session?.accessToken);
      onCloseDeleteWishlistModal();
      setCurrentWishLists((prev) =>
        prev.filter((wishlist) => wishlist._id !== reqBody.wishListId),
      );
    } catch (error) {
      console.error('Error editing wish list:', error);
    } finally {
      setWishListToDelete(null);
    }
  };

  return {
    // Wishlists
    currentWishLists,
    setCurrentWishLists,

    // Modals
    isAddWishlistModalOpen,
    onOpenAddWishlistModal,
    onCloseAddWishlistModal,
    isEditWishlistModalOpen,
    onOpenEditWishlistModal,
    onCloseEditWishlistModal,
    isDeleteWishlistModalOpen,
    onOpenDeleteWishlistModal,
    onCloseDeleteWishlistModal,

    // Wishlist Actions
    wishListToEdit,
    setWishListToEdit,
    wishListToDelete,
    setWishListToDelete,
    wishlistTableActions,
    handleAddWishList,
    handleEditWishList,
    handeDeleteWishList,
  };
};
