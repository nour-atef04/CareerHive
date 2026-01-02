import { useAuth } from "../../context/AuthContext";
import { useFollowUser, useUserFollowings } from "../../hooks/useUsers";
import Button from "../ui/Button";
import List from "../ui/List";
import PersonLi from "../ui/PersonLi";
import styles from "./RequestsList.module.css";

export default function RequestsList({
  followerIds,
  setConfirmUnfollowUser,
  showAll,
  MAX_PEOPLE,
}) {
  const { currentUser } = useAuth();
  const { data: followingIds } = useUserFollowings(currentUser);
  const followUser = useFollowUser();

  return (
    <List
      className={styles["requests-list"]}
      items={showAll ? followerIds : followerIds.slice(0, MAX_PEOPLE)}
      keyExtractor={(user) => user.id}
      emptyMessage="No people found."
      renderItem={(user) => {
        const followed = followingIds?.includes(user.id);

        return (
          <PersonLi className={styles.person} person={user}>
            <Button
              onClick={() =>
                followed
                  ? setConfirmUnfollowUser(user)
                  : followUser.mutate({
                      userIdToFollow: user.id,
                      userName: user.name,
                    })
              }
              size="sm"
              variant={followed ? "filled" : "outline-dark"}
            >
              {followed ? "−" : "+"}
            </Button>
          </PersonLi>
        );
      }}
    />
  );
}
