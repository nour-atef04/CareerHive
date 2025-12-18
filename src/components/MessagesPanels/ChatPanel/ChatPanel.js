import { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";
import NewMessageForm from "../NewMessageForm";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/authSlice";
// import {
//   createChat,
//   loadChats,
//   selectChatByParticipants,
//   sendMessage,
// } from "../../../redux/slices/chatsSlice";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import {
  useChats,
  useCreateChat,
  useSendMessage,
} from "../../../hooks/useChats";

export default function ChatPanel({ chatPerson, showChat, setShowChat }) {
  const user = useSelector(getUser);
  // const chat = useSelector((state) =>
  //   chatPerson ? selectChatByParticipants(state, user.name, chatPerson) : null
  // );
  const { data: chats = [] } = useChats();
  const chat = chats.find(
    (c) =>
      c.participants.includes(user.name) && c.participants.includes(chatPerson)
  );
  const createChat = useCreateChat();
  const sendMessage = useSendMessage();

  // // load messages on mount
  // useEffect(() => {
  //   dispatch(loadChats());
  // }, [dispatch]);

  const chatRef = useRef(null);

  // scroll to bottom when messages change
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat?.messages]);

  async function handleAddNewMessage(text) {
    if (!chat) {
      // dispatch(
      //   createChat({
      //     sender: user.name,
      //     receiver: chatPerson,
      //     text,
      //   })
      // );
      // return;
      await createChat.mutateAsync({
        sender: user.name,
        receiver: chatPerson,
        text,
      });
      return;
    }

    // dispatch(
    //   sendMessage({
    //     chatId: chat.id,
    //     sender: user.name,
    //     text,
    //   })
    // );
    sendMessage.mutate({
      chatId: chat.id,
      sender: user.name,
      text,
    });
  }

  if (!chatPerson) return <div></div>;

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
