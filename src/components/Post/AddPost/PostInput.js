import { useSelector } from "react-redux";
import FormInput from "../../ui/FormInput";
import ProfileIcon from "../../ui/ProfileIcon";
import styles from "./PostInput.module.css";
import { getUser } from "../../../redux/slices/authSlice";

export default function PostInput({setPostText, postText}) {
  const user = useSelector(getUser);
  const { image } = user;

  return (
    <div className={styles["add-post"]}>
      <ProfileIcon
        src={`/assets/${image}.jpg`}
        alt="user profile"
        size="medium"
      />
      <FormInput
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
        type="textarea"
        placeholder="What do you want to talk about?"
      />
    </div>
  );
}
