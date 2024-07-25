import React, { useEffect, useCallback, useState } from "react";
import { Card, FAB } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AddEvent from "../components/AddEvent";
import EventInfo from "../components/EventInfo";
import { supabase } from "../utils/hooks/supabase";
import { Dialog } from "@rneui/base";

export default function EventScreen({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = useState([]);


  function toggleComponent() {
    setVisible(!visible);
    console.log(visible);
  }

  function handleCardTouch(event){
    console.log("press")
    setDetailsVisible(true)
    console.log(detailsVisible)
    setSelectedEvent(event)

}

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  }, []);

  function toggleComponent() {
    setVisible(!visible);
    console.log(visible);
  }

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("event_tbl").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const refreshEvents = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.EventScreen}>
      <ScrollView refreshControl= {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        <View style={styles.Events}>
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => handleCardTouch(event)}
              style={styles.container}
            >
              <View style={styles.friends}>
                <Text style={styles.friendsText}>
                  {event.attending} friends going
                </Text>
              </View>
              <Image
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  borderRadius: 20,
                  objectFit: "cover",
                }}
                resizeMode="contain"
                source={{ uri: event.imageURL }}
              />
              <Card.Title style={styles.title}>{event.title}</Card.Title>
              <View style={styles.userInfo}>
                <Image
                  style={styles.bitmojiUser}
                  source={{
                    uri: "https://plus.unsplash.com/premium_photo-1664478383014-e8bc930be7c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
                  }}
                />
                <Text style={styles.username}>{event.host}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AddEvent
        isVisible={visible}
        onClose={() => {
          toggleComponent();
          refreshEvents();
        }}
      />
    
       <EventInfo
          isVisible={detailsVisible}
          event={selectedEvent}
          onClose={() => setDetailsVisible(false)}
        />
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
