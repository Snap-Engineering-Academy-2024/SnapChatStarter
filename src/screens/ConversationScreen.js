import {React, useState, useEffect, useCallback} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, ScrollView, Text, View, FlatList, SafeAreaView, ListItem} from "react-native";
import { useSafeAreaInsets, } from "react-native-safe-area-context";
import UserChat from "../components/UserChat";
import BasicChatbot from "../chatbots/BasicChatbot";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Allison", 
  avatar: ""
}

// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  }
}

export default function ConversationScreen({ route, navigation }) {
  const { isChatbot, chatId } = route.params;
  const insets = useSafeAreaInsets();

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
          // addUserMessage(data[0].messages[0].text)

          // if (conversations.user === me ) {
          // dont show
          //} else {show as response}
        }
    } catch (error) {
        console.error('Error fetching conversations:', error.message);
    }
  }

const addUserMessage = (text) => {
  addNewMessage([
    {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: CHATBOT_USER_OBJ,
    }
  ])
}

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
  .eq('id', "areli_allison")
  console.log("POST CONVERSATIONS ERROR: ", error)
}

console.log("MESSAGES", JSON.stringify(messages, null, 4));
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
            _id: 1, 
            name: "Areli" // signed in user variable
          }}
          renderUsernameOnMessage={true}
        />
        // <FlatList
        //   scrollEnabled={true}
        //   data={messages}
        //   // keyExtractor={(item) => `${item.id}`}
        //   keyExtractor={(item, index) => `${index}`}
        //   renderItem={({ item }) => (
        //     <ListItem bottomDivider>
        //       {/* <ListItem.Content> */}
        //         <View
        //           style={[
        //             { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
        //           ]}
        //         >
        //           <Text h3 style={{ margin: 'auto' }}>
        //           {/* {JSON.stringify(item)} */}
        //           </Text>
        //         </View>
        //       {/* </ListItem.Content> */}
        //     </ListItem>
        //   )}
        // />
}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});