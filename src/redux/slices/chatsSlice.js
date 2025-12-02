import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadChats = createAsyncThunk("chats/loadChats", async () => {
  const res = await fetch("http://localhost:3001/chats");
  const data = await res.json();
  return data;
});

export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async ({ chatId, sender, text }) => {
    const newMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toISOString(),
    };

    // getting existing thread of chatId
    const res = await fetch(`http://localhost:3001/chats/${chatId}`);
    const thread = await res.json();

    // update chat to add new msg
    const updatedChat = {
      ...thread,
      messages: [...thread.messages, newMessage],
    };

    // save to backend
    await fetch(`http://localhost:3001/chats/${chatId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedChat),
    });

    return { chatId, newMessage };
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ sender, receiver, text }) => {
    const newMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toISOString(),
    };
    const newChat = {
      id: Date.now().toString(),
      participants: [sender, receiver],
      messages: [newMessage],
    };
    const res = await fetch("http://localhost:3001/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChat),
    });
    const data = await res.json();
    return data;
  }
);

const initialState = {
  chats: [],
  loading: false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId, newMessage } = action.payload;
        const chat = state.chats.find((chat) => chat.id === chatId);
        if (chat) chat.messages.push(newMessage); // to immediately update UI
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload);
      });
  },
});

// export const { createChat } = messagesSlice.actions;

export default chatsSlice.reducer;

export const selectChatByParticipants = (state, person1, person2) =>
  state.chats.chats.find(
    (chat) =>
      chat.participants.includes(person1) && chat.participants.includes(person2)
  );
