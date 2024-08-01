import { Image, Text, View, StyleSheet } from "react-native";
import { supabase } from '../utils/hooks/supabase';

const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        // Handle successful sign out (e.g., redirect to login screen)
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/snapchat/defaultprofile.png")}
                style={styles.avatar}
            />
            <Text
                style={{ justifyContents: "center"}}>
                User Name Would Go Here
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignItems: "center",
    }
})