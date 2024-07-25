import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { supabase } from '../utils/hooks/supabase';


export default function AddFriendBitmoji() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('profiles') 
          .select('*')
          // .limit(1);

        if (error) {
          console.error('Error fetching users:', error.message);
          return;
        }
        if (data) {
          setProfiles(data);
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    }

    //username, friends_ids, avatar_url

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {profiles.map((user, index) => (
        <View key={index} style={styles.myBitmoji}>
          <Image
            style={styles.bitmojiImage}
            source={{ uri: user.avatar_url }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.bitmojiText}>
              {user.name}
              <Text style={styles.usernameText}> {user.username}</Text>
            </Text>
            <Pressable
              style={styles.addButton}
              onPress={() => {
                alert(`Added ${user.username} as a friend!`);
              }}
            >

              <Text style={styles.addButtonText}>Quick Add</Text>

            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  myBitmoji: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  bitmojiImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bitmojiText: {
    fontSize: 15,
    fontWeight: "700",
  },
  usernameText: {
    fontSize: 10,
    fontWeight: "700",
    opacity: 0.5,
  },
  addButton: {
    backgroundColor: "#FFFF00",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "black",
  },
});
