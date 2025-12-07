import { useNavigate } from "react-router-dom";
import MessagePerson from "../MessagePerson";

const MAX_PEOPLE = 7;

export default function PeopleList({ followingList, setShowChat }) {
  const navigate = useNavigate();

  return (
    <>
      {followingList.slice(0, MAX_PEOPLE).map((person, i) => (
        <MessagePerson
          key={i}
          name={person}
          onClick={() => {
            setShowChat(true);
            navigate(`/messages/${encodeURIComponent(person)}`);
          }}
        />
      ))}
    </>
  );
}
