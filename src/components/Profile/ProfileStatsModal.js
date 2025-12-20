import styles from "./ProfileStatsModal.module.css";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import List from "../ui/List";
import Loader from "../ui/Loader";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useFollowUser,
  useUnfollowUser,
  useUserFollowers,
  useUserFollowings,
} from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";
import PersonLi from "../ui/PersonLi";
import ConfirmModal from "../ui/ConfirmModal";

export default function ProfileStatsModal({ onClose }) {
  const [section, setSection] = useState("followers");
  const [confirmUnfollowUser, setConfirmUnfollowUser] = useState(null);

  const { userId } = useParams();
  const { currentUser } = useAuth();

  let profileId = userId === "me" ? currentUser.id : userId;

  const followersQuery = useUserFollowers(profileId);
  const followingsQuery = useUserFollowings(profileId);

  const { items, isLoading } = useMemo(() => {
    return section === "followers"
      ? {
          items: followersQuery.data ?? [],
          isLoading: followersQuery.isLoading,
        }
      : {
          items: followingsQuery.data ?? [],
          isLoading: followingsQuery.isLoading,
        };
  }, [
    section,
    followersQuery.data,
    followersQuery.isLoading,
    followingsQuery.data,
    followingsQuery.isLoading,
  ]);

  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  return (
    <>
      <Modal onClose={onClose} className={styles.modal}>
        <div className={styles.btns}>
          <Button
            onClick={() => setSection("followers")}
            className={styles.btn}
            variant={section === "followers" ? "disabled-dark" : "outline-dark"}
          >
            Followers
          </Button>
          <Button
            onClick={() => setSection("followings")}
            className={styles.btn}
            variant={
              section === "followings" ? "disabled-dark" : "outline-dark"
            }
          >
            Followings
          </Button>
        </div>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <List
            className={styles.list}
            items={items}
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
                    className={styles["follow-btn"]}
                  >
                    {followed ? "−" : "+"}
                  </Button>
                </PersonLi>
              );
            }}
          />
        )}
      </Modal>
      {confirmUnfollowUser && (
        <ConfirmModal
          title="Unfollow user?"
          message={`Are you sure you want to unfollow ${confirmUnfollowUser.name}?`}
          confirmLabel="Unfollow"
          onCancel={() => setConfirmUnfollowUser(null)}
          onConfirm={() => {
            unfollowUser.mutate(confirmUnfollowUser.id);
            setConfirmUnfollowUser(null);
          }}
        />
      )}
    </>
  );
}
