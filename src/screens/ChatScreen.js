import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase"; // Import Supabase client
import { Button, Icon } from "@rneui/base";
import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
import { useFonts } from "expo-font";

export default function ChatScreen({ navigation }) {
  // const [chats, setChats] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [loaded, error] = useFonts({
    "AvenirNext-Regular": require("../../assets/fonts/AvenirNext-Regular.ttf"),
  });

  // function getChatbots() {
  //   let chatbotsTemp = [];
  //   for (const botId in CHATBOTS) {
  //     chatbotsTemp.push({ isChatbot: true, chatId: botId });
  //   }

  //   setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  // }

  // async function getUserChats() {
  //   // Fetch user chats from Supabase
  //   const { data: userChats, error } = await supabase
  //     .from('conversations')
  //     .select('id')
  //     .select('messages');

  //   if (error) {
  //     console.error("Error fetching user chats:", error);
  //     return;
  //   }

  //   // Add user chats to array
  //   let userChatsTemp = [];
  //   if (userChats) {
  //     userChats.forEach((userChat) => {
  //       userChatsTemp.push({ isChatbot: false, chatId: userChat.id });
  //     });
  //   }

  //   setChats((otherChats) => [...otherChats, ...userChatsTemp]);
  // }

  // useEffect(() => {
  //   if (chats.length < 1) {
  //     getChatbots();
  //     // getUserChats();
  //   }
  // }, [chats.length]);

  return (
    <View
      style={[
        styles.container,
        {
          width: "100%",
          paddingTop: insets.top,
        },
      ]}
    >
      <Header title="Chat" style={{ color: "white" }} />
      <ImageBackground
        source={require("../../assets/chat-background.png")}
        style={styles.backgroundImage}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "7.5%",
            paddingLeft: "22%",
          }}
        >
          <Text
            style={{
              fontFamily: "AvenirNext-Regular",
              fontSize: 17,
              fontWeight: "500",
              color: "#FFFFFF",
            }}
          >
            Brain Bites{"\n"}
            <Text
              style={{
                fontSize: 13,
                color: "gray",
              }}
            >
              Games for learning!
            </Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10%",
              justifyContent: "center",
              marginRight: "8%",
            }}
          >
            <Button
              title="Play now"
              titleStyle={{
                fontFamily: "AvenirNext-Regular",
                fontSize: 12,
                fontWeight: "600",
                color: "#FFFFFF",
              }}
              buttonStyle={{
                backgroundColor: "rgba(15, 173, 255, 1)",
                borderRadius: 7,
              }}
              onPress={() => navigation.navigate("Game")}
              accessibilityLabel="Navigate to Welcome screen"
            />
            <Icon name="close" color="white" marginTop="25%" />
          </View>
        </View>
      </ImageBackground>
    </View>

    //     <View>
    //       {chats?.map((chat) => { */}
    // {/* //         return ( */}
    // {/* //           <TouchableOpacity */}
    //             {/* // style={styles.userButton} */}
    // {/* //             onPress={() => { */}
    // {/* //               navigation.navigate("Conversation", { */}
    // {/* //                 isChatbot: chat.isChatbot, */}
    // {/* //                 chatId: chat.chatId, */}
    // {/* //               }); */}
    // {/* //             }} */}
    // {/* //             key={chat.chatId} */}
    // {/* //           > */}
    // {/* //             <Ionicons */}
    // {/* //               style={styles.userIcon}
    // //               name="person-outline"
    // //               size={36}
    // //               color="lightgrey"
    // //             />
    // //             <Text style={styles.userName}> {chat.chatId} </Text>
    // //             <Ionicons */}
    // {/* //               style={styles.userCamera}
    // //               name="camera-outline"
    // //               size={24}
    // //               color="lightgrey"
    // //             />
    // //           </TouchableOpacity> */}
    // {/* //         ); */}
    // {/* //       })}
    // //     </View> */}
    //   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 520 / 852,
    flexDirection: "row",
  },
  // userButton: {
  //   padding: 25,
  //   display: "flex",
  //   borderBottomColor: "lightgrey",
  //   borderBottomWidth: 1,
  // },
  // userIcon: {
  //   position: "absolute",
  //   left: 5,
  //   top: 5,
  // },
  // userName: {
  //   position: "absolute",
  //   left: 50,
  //   top: 14,
  //   fontSize: 18,
  // },
  // userCamera: {
  //   position: "absolute",
  //   right: 15,
  //   top: 10,
  // },
});
