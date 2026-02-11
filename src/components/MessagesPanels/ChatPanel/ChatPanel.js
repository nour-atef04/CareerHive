import { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";
import NewMessageForm from "../NewMessageForm";
import { useAuth } from "../../../context/AuthContext";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import {
  useChatById,
  useChatByParticipantsId,
  useCreateChat,
  useMarkChatAsRead,
  useSendMessage,
} from "../../../hooks/useChats";
import Loader from "../../ui/Loader";
import { useUser } from "../../../hooks/useUsers";

export default function ChatPanel({ chatPersonId, showChat, setShowChat }) {
  const { currentUser: user } = useAuth();

  // get chat id
  const { data: chatId, isLoading: isChatIdLoading } = useChatByParticipantsId(
    user.id,
    chatPersonId,
  );

  // get actual messages using the id
  const { data: messages = [], isMsgLoading } = useChatById(chatId);

  // get recepient profile details
  const { data: chatPerson, isLoading: isUserLoading } = useUser(chatPersonId);

  const createChat = useCreateChat();
  const sendMessage = useSendMessage();

  const { mutate: markAsRead } = useMarkChatAsRead();

  useEffect(() => {
    if (chatId && user) {
      markAsRead({ chatId, userId: user.id });
    }
  }, [chatId, user, markAsRead]);

  async function handleAddNewMessage(text) {
    if (!text.trim()) return;

    if (!chatId) {
      await createChat.mutateAsync({
        senderId: user.id,
        receiverId: chatPersonId,
        text,
      });
    } else {
      sendMessage.mutate({
        chatId,
        senderId: user.id,
        text,
      });
    }
  }

  if (!chatPersonId) return <div></div>;
  if (isChatIdLoading || isUserLoading || (chatId && isMsgLoading))
    return <Loader />;

  return (
    <section
      aria-label={`Chat with ${chatPerson?.name}`}
      className={`${styles["chat-section"]} ${showChat && styles["show-chat"]}`}
    >
      <ChatHeader chatPerson={chatPerson} setShowChat={setShowChat} />
      <ChatMessages messages={messages} chatPerson={chatPerson} user={user} />
      <NewMessageForm onAddNewMessage={handleAddNewMessage} />
    </section>
  );
}
