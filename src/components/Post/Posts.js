import { PostProvider } from "../../context/PostContext";
import Post from "./Post";

export default function Posts({ className }) {
  return (
    <div className={className || ""}>
      <PostProvider>
        <Post />
      </PostProvider>
    </div>
  );
}
