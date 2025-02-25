import {
  addFriendRequest,
  deleteFriendRequest,
} from '@/api/friendsRequests/friendsRequests';
import { withToastAsync } from '@/utils/helpers';

const addFriendWithToast = withToastAsync(
  addFriendRequest,
  'Friend request sent successfully',
  'Error sending friend request',
);

const deleteFriendWithToast = withToastAsync(
  deleteFriendRequest,
  'Friend request deleted successfully',
  'Error deleting friend request',
);

export { addFriendWithToast, deleteFriendWithToast };
