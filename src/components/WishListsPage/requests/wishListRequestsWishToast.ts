import {
  createWishListRequest,
  deleteWishListRequest,
  editWishListRequest,
} from '@/api/wishListsRequests/wishListsRequests';
import { withToastAsync } from '@/utils/helpers';

const createWishListRequestWithToast = withToastAsync(
  createWishListRequest,
  'Wish list created successfully',
  'Error creating wish list',
);

const editWishListRequestWithToast = withToastAsync(
  editWishListRequest,
  'Wish list edited successfully',
  'Error editing wish list',
);

const deleteWishListRequestWithToast = withToastAsync(
  deleteWishListRequest,
  'Wish list deleted successfully',
  'Error deleting wish list',
);

export {
  createWishListRequestWithToast,
  editWishListRequestWithToast,
  deleteWishListRequestWithToast,
};
