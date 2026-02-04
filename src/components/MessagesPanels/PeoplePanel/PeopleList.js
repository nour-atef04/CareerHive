import { useNavigate } from "react-router-dom";
import MessagePerson from "../MessagePerson";
import List from "../../ui/List";
import styles from "./PeopleList.module.css";

const MAX_PEOPLE = 7;

export default function PeopleList({ people, setShowChat }) {
  const navigate = useNavigate();

  const peopleList = people?.slice(0, MAX_PEOPLE);

  return (
    <>
      <List
        items={peopleList}
        className={styles.list}
        keyExtractor={(user) => user.id}
        renderItem={(person) => (
          <MessagePerson
            key={person.id}
            image={person.image}
            name={person.name}
            id={person.id}
            onClick={() => {
              setShowChat(true);
              navigate(`/messages/${person.id}`);
            }}
            mode="list"
          />
        )}
      />
    </>
  );
}
