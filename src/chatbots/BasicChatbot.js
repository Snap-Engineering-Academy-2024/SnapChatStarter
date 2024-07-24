import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGpt";

const prompt = [
  {
    role: "system",
    content:
      "Ask the user for their name on the first query, after that, ask the user what they are super knowledgeable about, if they say something like “I don’t know” or “nothing”, nicely tell them to ask one of their friends to play. If the user replies with their area of expertise, ask them if they want to play a trivia of that thing, if they say no, nicely ask them to ask their friends to play, if they say yes, give them 10 questions about that area of expertise. Unless their area of expertise isn't in your knowledge bank, if it isn't, simply tell the user nicely and nicely tell them to choose another area of expertise. As the user answers more questions correctly, give them harder questions. Keep track of their score and give it to them after the 10 questions. Ask one question at a time, and don't go onto the next question until the user answers.",
  },
];

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const addNewMessage = (newMessages) => {
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

  async function getChatResponse(allMessages){
    //console.log(allMessages);
    const response = await getChat(allMessages.reverse());
    const message = response.choices[0].message;
    const content = message.content;
    addBotMessage(content);
  }

  const respondToUser = (newMessages) => {
    let allMessages = [newMessages[0], ...messages];
    allMessages = allMessages.map((element) => {
      if (element.user.name === "React Native Chatbot" ){
        return {role: "assistant", content: element.text}
      }
      else{
        return {role: "user", content: element.text}
      }
    })
    allMessages.push(prompt[0]);
    getChatResponse(allMessages);
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = message.content;
    addBotMessage(content);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Jay",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
