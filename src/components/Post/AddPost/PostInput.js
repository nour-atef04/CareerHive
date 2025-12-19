// import { useSelector } from "react-redux";
import FormInput from "../../ui/FormInput";
import ProfileIcon from "../../ui/ProfileIcon";
// import { getUser } from "../../../redux/slices/authSlice";
import styles from "./PostInput.module.css";
import { useAuth } from "../../../context/AuthContext";

export default function PostInput({ postText, setPostText }) {
  // const user = useSelector(getUser);
  const {currentUser : user} = useAuth();
  const { image } = user;

  return (
    <div className={styles["add-post"]}>
      <ProfileIcon src={`/assets/${image}.jpg`} alt="user profile" size="medium" />
      <FormInput
        type="textarea"
        placeholder="What do you want to talk about?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
    </div>
  );
}
