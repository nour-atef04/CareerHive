import { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";
import NewMessageForm from "../NewMessageForm";
import { useAuth } from "../../../context/AuthContext";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import {
  useChatByParticipantsId,
  useCreateChat,
  useSendMessage,
} from "../../../hooks/useChats";
import Loader from "../../ui/Loader";
import { useUser } from "../../../hooks/useUsers";

export default function ChatPanel({ chatPersonId, showChat, setShowChat }) {
  const { currentUser: user } = useAuth();

  const { data: chat, isLoading: isChatLoading } = useChatByParticipantsId(
    user.id,
    chatPersonId
  );

  const { data: chatPerson, isLoading: isUserLoading } = useUser(chatPersonId);

  const createChat = useCreateChat();
  const sendMessage = useSendMessage();
  const chatRef = useRef(null);

  // scroll to bottom when messages change
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat?.messages]);

  async function handleAddNewMessage(text) {
    if (!chat) {
      await createChat.mutateAsync({
        senderId: user.id,
        receiverId: chatPersonId,
        text,
      });
      return;
    }
    sendMessage.mutate({
      chatId: chat.id,
      senderId: user.id,
      text,
    });
  }

  if (!chatPersonId) return <div></div>;
  if (isChatLoading || isUserLoading) return <Loader />;

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
