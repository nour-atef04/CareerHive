import Post from "./Post";

export default function Posts({ className }) {
  return (
    <div className={className || ""}>
      <Post />
    </div>
  );
}
