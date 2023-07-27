import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../../firebase";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { View, Text } from "react-native";

export default function UserChat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const chatRef = doc(db, "Chats", chatId);

  const { user, userData } = useAuthentication();

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(chatRef, (doc) => {
      console.log("New Snapshot (chat sent or received)!");
      setMessages(doc.data().messages);
    });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    updateDoc(chatRef, {
      // arrayUnion appends the message to the existing array
      messages: arrayUnion(messages[0]),
    });
  }, []);

  // if the user or user data doesn't exist, don't load da chat
  if (!user || !userData || chatRef) {
    return (
      <View>
        <Text>Missing user data or chat ref</Text>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
        name: userData.name,
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}
