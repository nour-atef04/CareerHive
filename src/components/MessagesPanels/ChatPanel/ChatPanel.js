import { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";
import NewMessageForm from "../NewMessageForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/authSlice";
import {
  createChat,
  loadChats,
  selectChatByParticipants,
  sendMessage,
} from "../../../redux/slices/chatsSlice";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatPanel({ chatPerson, showChat, setShowChat }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const chat = useSelector((state) =>
    selectChatByParticipants(state, user.name, chatPerson)
  );

  // load messages on mount
  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch]);

  const chatRef = useRef(null);

  // scroll to bottom when messages change
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat?.messages]);

  function handleAddNewMessage(text) {
    if (!chat) {
      dispatch(
        createChat({
          sender: user.name,
          receiver: chatPerson,
          text,
        })
      );
      return;
    }

    dispatch(
      sendMessage({
        chatId: chat.id,
        sender: user.name,
        text,
      })
    );
  }

  return (
    <section
      className={`${styles["chat-section"]} ${showChat && styles["show-chat"]}`}
    >
      <ChatHeader chatPerson={chatPerson} setShowChat={setShowChat} />
      <ChatMessages chat={chat} chatPerson={chatPerson} user={user} />
      <NewMessageForm onAddNewMessage={handleAddNewMessage} />
    </section>
  );
}
