import { useAuth } from "../../context/AuthContext";
import { useFollowUser } from "../../hooks/useUsers";
import Button from "../ui/Button";
import List from "../ui/List";
import PersonLi from "../ui/PersonLi";
import styles from "./RequestsList.module.css";

export default function RequestsList({
  followers,
  setConfirmUnfollowUser,
  showAll,
  MAX_PEOPLE,
}) {
  const { currentUser } = useAuth();
  const followUser = useFollowUser();

  return (
    <List
      className={styles["requests-list"]}
      items={showAll ? followers : followers.slice(0, MAX_PEOPLE)}
      keyExtractor={(user) => user.id}
      emptyMessage="No people found."
      renderItem={(user) => {
        const followed = currentUser.followingIds?.includes(user.id);

        return (
          <PersonLi className={styles.person} person={user}>
            <Button
              onClick={() =>
                followed
                  ? setConfirmUnfollowUser(user)
                  : followUser.mutate(user.id)
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
