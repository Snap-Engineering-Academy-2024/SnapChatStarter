import React, { useEffect } from "react";
import { useState } from "react";

import { Card, FAB } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AddEvent from "../components/AddEvent";
import { supabase } from "../utils/hooks/supabase";

export default function EventScreen({ route, navigation }) {
  const [visible, setVisible] = useState(false);

  function toggleComponent() {
    setVisible(!visible);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('event_tbl') 
          .select('*')
          .eq('id', '0')
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Data:", data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.EventScreen}>
      <ScrollView>
        <View style={styles.Events}>
          <View style={styles.container}>
            <View style={styles.friends}>
              <Text style={styles.friendsText}>3 friends going</Text>
            </View>
            <Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 20 }}
              resizeMode="contain"
              source={{
                uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
              }}
            />
            <Card.Title style={styles.title}>Sona's Birthday</Card.Title>
            <View style={styles.userInfo}>
              <Image
                style={styles.bitmojiUser}
                source={{
                  uri: "https://plus.unsplash.com/premium_photo-1664478383014-e8bc930be7c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
                }}
              />
              <Text style={styles.username}>username</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.friends}>
              <Text style={styles.friendsText}>3 friends going</Text>
            </View>
            <Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 20 }}
              resizeMode="contain"
              source={{
                uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
              }}
            />
            <Card.Title style={styles.title}>Sona's Birthday</Card.Title>
            <View style={styles.userInfo}>
              <Image
                style={styles.bitmojiUser}
                source={{
                  uri: "https://plus.unsplash.com/premium_photo-1664478383014-e8bc930be7c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
                }}
              />
              <Text style={styles.username}>username</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.friends}>
              <Text style={styles.friendsText}>3 friends going</Text>
            </View>
            <Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 20 }}
              resizeMode="contain"
              source={{
                uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
              }}
            />
            <Card.Title style={styles.title}>Sona's Birthday</Card.Title>
            <View style={styles.userInfo}>
              <Image
                style={styles.bitmojiUser}
                source={{
                  uri: "https://plus.unsplash.com/premium_photo-1664478383014-e8bc930be7c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
                }}
              />
              <Text style={styles.username}>username</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <FAB
        onPress={toggleComponent}
        style={styles.addButton}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="#FF3386"
      />
      {<AddEvent isVisible={visible} onClose={toggleComponent} />}
    </View>
  );
}

const styles = StyleSheet.create({
  Events: {
    padding: 20,
    width: "100%",
    display: "flex",
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  container: {
    width: "48%",
    backgroundColor: "#E5E5E5",
    display: "flex",
    justifyContent: "space-between",
    // alignItems:"center",
    padding: 10,
    // gap:10,
    borderRadius: 20,
    maxHeight: 250,
    margin: 0,
  },
  bitmojiUser: {
    width: 28,
    aspectRatio: 1,
    borderRadius: 1000,
    margin: 0,
  },
  title: {
    textAlign: "left",
    marginTop: 8,
    marginBottom: 5,
    fontSize: 15,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 0,
  },
  friends: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 100,
    backgroundColor: "pink",
    margin: 0,
    borderRadius: 20,
    padding: 10,
  },
  friendsText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  username: {
    fontSize: 11,
    margin: 0,
    fontWeight: "bold",
    color: "#575757",
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
  EventScreen: {
    height: "100%",
  },
});
