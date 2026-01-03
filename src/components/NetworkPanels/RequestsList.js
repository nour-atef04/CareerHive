import { useAuth } from "../../context/AuthContext";
import { useFollowUser, useUserFollowings } from "../../hooks/useUsers";
import Button from "../ui/Button";
import List from "../ui/List";
import PersonLi from "../ui/PersonLi";
import styles from "./RequestsList.module.css";

export default function RequestsList({
  requests,
  setConfirmUnfollowUser,
  showAll,
  MAX_PEOPLE,
}) {
  const { currentUser } = useAuth();
  const { data: followings } = useUserFollowings(currentUser.id);
  const followUser = useFollowUser();

  return (
    <List
      className={styles["requests-list"]}
      items={showAll ? requests : requests.slice(0, MAX_PEOPLE)}
      keyExtractor={(user) => user.id}
      emptyMessage="No people found."
      renderItem={(user) => {
        const followed = followings?.some((f) => f.id === user.id);

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
