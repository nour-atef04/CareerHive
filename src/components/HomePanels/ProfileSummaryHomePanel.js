export default function ProfileSummaryHomePanel({ profileName, className }) {
  return (
    <div className={className || ""}>
      Profile Summary
      <h1>{profileName}</h1>
    </div>
  );
}
