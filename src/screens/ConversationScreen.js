import {React, useState, useEffect, useCallback} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Text, SafeAreaView } from "react-native";
import BasicChatbot from "../chatbots/BasicChatbot";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
const CHATBOT_USER_OBJ = {
  _id: 1,
  name: "Areli",
  avatar: ""
}
export const CHATBOTS = {
  "BasicChatbot": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  }
}
export default function ConversationScreen({ route, navigation }) {
  const { user } = useAuthentication()
    const [loading, setLoading] = useState(true)
  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([])
  useEffect(() => {
    fetchConversations();
    if (user !==  null) {
      setLoading(false);
      console.log("USER", user)
  }
  }, [user]);
  async function fetchConversations() {
    try {
        const { data, error } = await supabase
        .from('conversations')
        .select('*');
        if (error) {
        console.error('Error fetching conversations:', error.message);
        return;
        }
        if (conversations) {
          setConversations(data)
          console.log("DATA", JSON.stringify(data, null, 4))
          setMessages(data[0].messages);
        }
    } catch (error) {
        console.error('Error fetching conversations:', error.message);
    }
  }
  const handleInserts = (payload) => {
    console.log('Change received!', JSON.stringify(payload, null, 4))
    // if (payload.new.messages[0]._id === messages[0]._id) {
    //   console.log()
    // }
    // console.log("PAYLOAD", payload.new.messages[0]._id)
    // console.log("MESSAGES", messages[0]._id)
    addNewMessage(payload.new.messages[0])
  }
  // Listen to inserts
  supabase
    .channel('conversations')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'conversations' }, handleInserts)
    .subscribe()
  
const addNewMessage = (newMessages) => {
  setMessages((previousMessages) => {
    // console.log("PREVIOUS MESSAGES:", previousMessages);
    // console.log("NEW MESSAGE:", newMessages);
    return GiftedChat.append(previousMessages, newMessages);
  });
};
const onSend = useCallback((messages = []) => {
  addNewMessage(messages);
}, []);
async function postConversations(newMessages) {
  const allMessages = [newMessages[0],...messages];
  const { data, error } = await supabase
  .from('conversations')
  .update({ messages: allMessages })
  .eq('id', "areli_allison") // COMBINED NAMES OF USERS IS THE ID, CHANGE FOR USERS
  console.log("POST CONVERSATIONS ERROR: ", error)
}
// console.log("MESSAGES", JSON.stringify(messages, null, 4));
  return (
<SafeAreaView style={styles.container}>
        {messages &&
        // <Text>{JSON.stringify(messages)}</Text>
        <GiftedChat
          messages={messages}
          onSend={newMessages => {
            onSend(newMessages)
            postConversations(newMessages)
          }}
          user={{
            _id: 2,
            name: "Allison" 
          }}
          renderUsernameOnMessage={true}
        />
}
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});







