import DateSeperator from "./DateSeperator";
export default function ChatEmptyState({ chatPerson }) {
  return (
    <DateSeperator>No messages yet. Say Hi to {chatPerson}!</DateSeperator>
  );
}
