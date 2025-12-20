import { useNavigate } from "react-router-dom";
import MessagePerson from "../MessagePerson";
import List from "../../ui/List";
import styles from "./PeopleList.module.css"

const MAX_PEOPLE = 7;

export default function PeopleList({ followings, setShowChat }) {
  const navigate = useNavigate();

  const people = followings?.slice(0, MAX_PEOPLE);

  return (
    <>
      <List
        items={people}
        className={styles.list}
        keyExtractor={(user) => user.id}
        renderItem={(person) => (
          <MessagePerson
            key={person.id}
            name={person.name}
            onClick={() => {
              setShowChat(true);
              navigate(`/messages/${person.id}`);
            }}
          />
        )}
      />
    </>
  );
}
