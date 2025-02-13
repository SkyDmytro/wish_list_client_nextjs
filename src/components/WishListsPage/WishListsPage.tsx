'use client';

import { getRequest } from '@/api/requests';
import { useModal } from '@/hooks/useModal';
import { WishListDataType } from '@/types/types';
import { UserType } from '@/types/user';
import { wishList } from '@/types/wishList';
import { API_URL, wishlistUrl } from '@/utils/config';

import { useEffect, useMemo, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Edit,
  ExternalLink,
  Gift,
  Trash,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { AddWishlistModal } from '../AddWishListModal/AddWishListModal';
import { DeleteWishListModal } from '../DeleteWishListModal/DeleteWishListModal';
import { EditWishListModal } from '../EditWishListModal/EditWishListModal';
import { Spinner } from '../Loading/Loading';
import { Button } from '../ui/button';
import {
  createWishListRequestWithToast,
  deleteWishListRequestWithToast,
  editWishListRequestWithToast,
} from './requests/wishListRequestsWishToast';
import { actionsType } from './types/types';
import { WishListPageHeader } from './ui/WishListPageHeader';
import { WishListsTable } from './ui/WishListsTable';

export const WishListsPage = ({
  wishlists,
  isUserTheOwner,
  wishListOwner,
  pagination,
}: {
  wishlists: wishList[];
  isUserTheOwner: boolean;
  wishListOwner: UserType;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}) => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [currentWishLists, setCurrentWishLists] = useState(wishlists);

  const { data: session, status } = useSession({ required: true });
  const [wishListToEdit, setWishListToEdit] = useState<wishList | null>(null);
  const [wishListToDelete, setWishListToDelete] = useState<wishList | null>(
    null,
  );
  const router = useRouter();

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

  const wishlistTableActions: actionsType[] = useMemo(
    () => [
      {
        component: (
          <Button
            variant="ghost"
            className="text-purple-500 w-full flex justify-start"
          >
            <ExternalLink className="mr-2 h-2 w-2" />
            View
          </Button>
        ),
        onClick: (item) => () => {
          const id = item._id;
          router.push(`/wishlists/${id as string}`);
        },
      },
      {
        component: (
          <Button
            variant="ghost"
            className="text-purple-500 w-full flex justify-start"
          >
            <Edit className="mr-2 h-2 w-2" />
            Edit Wish List
          </Button>
        ),
        onClick: (item) => () => {
          console.log(item);
          setWishListToEdit(item as wishList);
          onOpenEditWishlistModal();
        },
      },
      {
        component: (
          <Button
            variant="destructive"
            className="bg-red-500 text-white w-full flex justify-start"
          >
            <Trash className="mr-2 h-2 w-2" />
            Delete Wish List
          </Button>
        ),
        onClick: (item) => () => {
          console.log(item);
          setWishListToDelete(item as wishList);
          onOpenDeleteWishlistModal();
        },
      },
    ],
    [onOpenDeleteWishlistModal, onOpenEditWishlistModal, router],
  );
  if (status === 'loading') {
    return (
      <div className="h-full bg-gradient-to-b from-gray-900 to-black p-8 text-white">
        <WishListPageHeader
          onOpenAddWishlistModal={() => {}}
          wishListOwner={wishListOwner}
          isUserTheOwner={isUserTheOwner}
        />
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

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
          if (wishlist._id === result._id) {
            const newWl: wishList = {
              ...wishlist,
              ...(result as wishList),
              updatedAt: new Date().toISOString(),
            };
            console.log(newWl);
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

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black p-8 text-white ">
      <AddWishlistModal
        isOpen={isAddWishlistModalOpen}
        closeModal={onCloseAddWishlistModal}
        onAddWishList={handleAddWishList}
      />
      <EditWishListModal
        key={wishListToEdit?._id}
        isOpen={isEditWishlistModalOpen}
        closeModal={onCloseEditWishlistModal}
        currentWishList={wishListToEdit as wishList}
        onEditWishList={handleEditWishList}
      />

      <DeleteWishListModal
        isDeleteWishlistModalOpen={isDeleteWishlistModalOpen}
        onCloseDeleteWishlistModal={onCloseDeleteWishlistModal}
        onDeleteWishList={handeDeleteWishList}
      />

      <WishListPageHeader
        onOpenAddWishlistModal={onOpenAddWishlistModal}
        wishListOwner={wishListOwner}
        isUserTheOwner={isUserTheOwner}
      />

      <div className=" mt-6 rounded-lg border border-slate-800 bg-slate-900/50">
        {currentWishLists.length === 0 ||
        (!isUserTheOwner &&
          currentWishLists.every(
            (wishlist) => wishlist.access === 'private',
          )) ? (
          <div className="flex items-center justify-center space-x-2 p-6">
            <Gift className="h-5 w-5 text-purple-400" />
            <p className="text-sm font-medium text-white">
              {isUserTheOwner
                ? 'You have no wishlists yet.'
                : `User has no wishlists yet.`}
            </p>
          </div>
        ) : (
          <WishListsTable
            actions={wishlistTableActions}
            wishlists={currentWishLists}
            isUserTheOwner={isUserTheOwner}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {(currentPage - 1) * pagination.pageSize + 1} to{' '}
          {Math.min(currentPage * pagination.pageSize, pagination.total)} of{' '}
          {pagination.total} wishlists
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="border-gray-800 hover:bg-gray-900 text-black hover:text-white"
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage === pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
