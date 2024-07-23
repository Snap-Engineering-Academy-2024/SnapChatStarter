import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "/Users/christian/VsCodeProjects/SnapChatStarterCode/src/utils/hooks/getGPT.js";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};
const TEST_VARS = {
  convoID: "testConvo",
};
const prompt = [
  {
    role: "assistant",
    content: " Can you just translate whatever I say to french and english?"
  },
];

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [convoKey, setConvoKey] = useState();

  async function fetchUserEmail() {
    const userObj = await useAuthentication();
    setUserEmail(userObj.email);
    console.log("User Email from Chatbot: ", userEmail);
    let uniqueKey = userEmail + CHATBOT_USER_OBJ.name;
    setConvoKey(uniqueKey);
    console.log("Unique Key: ", uniqueKey);
  }
  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;
    addBotMessage(content);
  }
  useEffect(() => {
    fetchUserEmail();
    getSupaHistory();
    fetchInitialMessage();
  }, []);

  async function fetchReply(messageHistory) {
    const response = await getChat([prompt[0], ...messageHistory]);
    if (response != null) {
      const message = response.choices[0].message;
      const content = response.choices[0].message.content;

      addBotMessage(content);

    }
  }
  async function getSupaHistory() {
    const { data, error } = await supabase
      .from("conversations")
      .select("messages")
      .eq("id", "testConvo")
      .single();
    if (error) {
      let { insertError } = await supabase
        .from("conversations")
        .insert({ id: "testConvo", messages: {} });
    }
    if (data) {
      console.log("Fetched Supa is :", data.messages);
      setMessages(data.messages);
    }
  }

  async function updateSupa(messages) {
    console.log("Setting supa" , messages);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .update({ messages: messages })
        .eq("id", 'testConvo');

      if (error) {
        console.error("Error updating conversation:", error);
      } else {
        console.log("Conversation updated successfully:", data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  const addNewMessage = (newMessages) => {
    console.log(" from add new message / Messages object: ", messages);
    setMessages((previousMessages) => {

      return GiftedChat.append(previousMessages, newMessages);
    });
    
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    const allMessages = [userMessages[0], ...messages].reverse(); // Add the user message to the front of the array
   
    console.log("Messages looks like", messages)
    const temp = {};
    console.log("all messages: ", allMessages);
    updateSupa([userMessages[0], ...messages])
  
    const gptMessages = allMessages.map((entry) => {
      let temp = {};

      if (entry.user.name === "React Native Chatbot") {
        temp["role"] = "assistant";
      } else {
        temp["role"] = "user";
      }
      temp["content"] = entry.text;

      return temp;
    });
    fetchReply(gptMessages);
  };

  // Messages is most recent not the state variable
  const onSend = useCallback((newestMessage = []) => {

    addNewMessage(newestMessage);

    updateSupa()

  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(mostRecentMessages) => {
        onSend(mostRecentMessages);
        setTimeout(() => respondToUser(mostRecentMessages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker", // Change this later
      }}
      renderUsernameOnMessage={true}
    />
  );
}
