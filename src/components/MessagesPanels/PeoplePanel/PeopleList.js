import { useNavigate } from "react-router-dom";
import MessagePerson from "../MessagePerson";

const MAX_PEOPLE = 7;

export default function PeopleList({ followings, setShowChat }) {
  const navigate = useNavigate();

  return (
    <>
      {followings.slice(0, MAX_PEOPLE).map((person) => (
        <MessagePerson
          key={person.id}
          name={person.name}
          onClick={() => {
            setShowChat(true);
            navigate(`/messages/${person.id}`);
          }}
        />
      ))}
    </>
  );
}
