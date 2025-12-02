import MessagePerson from "../MessagePerson";

const MAX_PEOPLE = 9;

export default function PeopleList({
  followingList,
  setShowChat,
  onSetChatPerson,
}) {
  return (
    <>
      {followingList.slice(0, MAX_PEOPLE).map((person, i) => (
        <MessagePerson
          key={i}
          name={person}
          onClick={() => {
            setShowChat(true);
            onSetChatPerson(person);
          }}
        />
      ))}
    </>
  );
}
