import styles from "./RequestsPanel.module.css";
import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import {
  useUnfollowUser,
  useUserFollowers,
} from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";
import Loader from "../ui/Loader";
import { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import RequestsList from "./RequestsList";

const MAX_PEOPLE = 6;

export default function RequestsPanel() {
  const { currentUser } = useAuth();
  const { data: followers = [], isLoading: isLoadingFollowers } =
    useUserFollowers(currentUser.id);
  const [confirmUnfollowUser, setConfirmUnfollowUser] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const unfollowUser = useUnfollowUser();

  const isLessThanMax = followers.length < MAX_PEOPLE;

  return (
    <Panel
      className={`${styles["requests-container"]} ${showAll && styles["all"]}`}
    >
      <PanelTitle type="h3" className={styles["requests-title"]}>
        Requests{" "}
        {!showAll && !isLessThanMax && (
          <span
            className={styles["show-more"]}
            onClick={() => setShowAll(true)}
          >
            Show all
          </span>
        )}
      </PanelTitle>

      {isLoadingFollowers ? (
        <Loader />
      ) : (
        <RequestsList
          followers={followers}
          setConfirmUnfollowUser={setConfirmUnfollowUser}
          showAll={showAll}
          MAX_PEOPLE={MAX_PEOPLE}
        />
      )}
      {confirmUnfollowUser && (
        <ConfirmModal
          title="Unfollow user?"
          message={`Are you sure you want to unfollow ${confirmUnfollowUser.name}?`}
          confirmLabel="Unfollow"
          onCancel={() => setConfirmUnfollowUser(null)}
          onConfirm={() => {
            unfollowUser.mutate({userIdToUnfollow: confirmUnfollowUser.id, userName: confirmUnfollowUser.name});
            setConfirmUnfollowUser(null);
          }}
        />
      )}
    </Panel>
  );
}
