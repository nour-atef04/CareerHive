import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import {
  useFollowUser,
  useUnfollowUser,
  useUserFollowings,
} from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";

export default function FollowMessageButtons({ user }) {
  const navigate = useNavigate();

  const { id, name } = user || {};
  const { currentUser } = useAuth();

  const { data: currentUserFollowings = [] } = useUserFollowings(
    currentUser.id,
  );
  const currentUserFollowingsIds = currentUserFollowings.map((user) => user.id);
  const isFollowing = currentUserFollowingsIds.includes(id);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unFollowUser } = useUnfollowUser();

  function handleFollowClick() {
    if (isFollowing) {
      unFollowUser({ userIdToUnfollow: id, userName: name });
    } else {
      followUser({ userIdToFollow: id, userName: name });
    }
  }

  return (
    <>
      <Button
        onClick={() => navigate(`/messages/${id}`)}
        variant="outline-dark"
        color="brand2"
      >
        Message
      </Button>

      {isFollowing ? (
        <Button onClick={handleFollowClick} variant="filled">
          Unfollow
        </Button>
      ) : (
        <Button onClick={handleFollowClick} variant="outline-dark">
          Follow
        </Button>
      )}
    </>
  );
}
