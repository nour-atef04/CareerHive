import styles from "./ProfileActivitySection.module.css";
import ProfileSection from "./ProfileSection";
import Button from "../ui/Button";
import Posts from "../Post/Posts";
import { useState } from "react";
import PanelTitle from "../ui/PanelTitle";

export default function ProfileActivitySection({ user }) {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <ProfileSection>
      <div className={styles["activity-container"]}>
        <PanelTitle type="h3">Activity</PanelTitle>
        <div className={styles["activity-buttons"]}>
          <Button
            size="sm"
            variant={activeTab === "posts" ? "disabled-dark" : "outline-dark"}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </Button>
          <Button
            size="sm"
            variant={
              activeTab === "comments" ? "disabled-dark" : "outline-dark"
            }
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </Button>
        </div>
      </div>
      {activeTab === "posts" && (
        <div className={styles["activity-scroll"]}>
          <Posts userId={user.id} />
        </div>
      )}
      {activeTab === "comments" && (
        <div className={styles["activity-scroll"]}>
          <Posts
            userId={user.id}
            commentedPostfilter={(post) =>
              post.comments.some((c) => c.authorId === user.id)
            }
          />
        </div>
      )}
    </ProfileSection>
  );
}
