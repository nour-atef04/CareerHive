import styles from "./ProfileStatsModal.module.css";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import List from "../ui/List";
import Loader from "../ui/Loader";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  const [section, setSection] = useState("followers");
  const [confirmUnfollowUser, setConfirmUnfollowUser] = useState(null);

  const { userId } = useParams();
  const { currentUser } = useAuth();

  let profileId = userId === "me" ? currentUser.id : userId;

  const followersQuery = useUserFollowers(profileId);
  const followingsQuery = useUserFollowings(profileId);

  const myFollowingsQuery = useUserFollowings(currentUser.id);

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
        <div className={styles.btns} role="tablist">
          <Button
            onClick={() => setSection("followers")}
            className={styles.btn}
            variant={section === "followers" ? "disabled-dark" : "outline-dark"}
            role="tab"
            aria-selected={section === "followers"}
          >
            Followers
          </Button>
          <Button
            onClick={() => setSection("followings")}
            className={styles.btn}
            variant={
              section === "followings" ? "disabled-dark" : "outline-dark"
            }
            role="tab"
            aria-selected={section === "followings"}
          >
            Followings
          </Button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <List
            className={styles.list}
            items={items}
            keyExtractor={(user) => user.id}
            emptyMessage="No people found."
            renderItem={(user) => {
              const isMe = user.id === currentUser.id;

              const amIFollowing = myFollowingsQuery.data?.some(
                (f) => f.id === user.id,
              );

              return (
                <PersonLi
                  className={styles.person}
                  person={user}
                  onClick={() => {
                    onClose();
                    navigate(`/profile/${user.id}`);
                  }}
                >
                  {/* Show Follow Button only if it's not me */}
                  {!isMe && (
                    <Button
                      size="sm"
                      variant={amIFollowing ? "filled" : "outline-dark"}
                      className={styles["follow-btn"]}
                      aria-label={
                        amIFollowing
                          ? `Unfollow ${user.name}`
                          : `Follow ${user.name}`
                      }
                      onClick={(e) => {
                        e.stopPropagation(); 

                        if (amIFollowing) {
                          setConfirmUnfollowUser(user);
                        } else {
                          followUser.mutate({
                            userIdToFollow: user.id,
                            userName: user.name,
                          });
                        }
                      }}
                    >
                      <span aria-hidden="true">{amIFollowing ? "−" : "+"}</span>
                    </Button>
                  )}
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
            unfollowUser.mutate({
              userIdToUnfollow: confirmUnfollowUser.id,
              userName: confirmUnfollowUser.name,
            });
            setConfirmUnfollowUser(null);
          }}
        />
      )}
    </>
  );
}
