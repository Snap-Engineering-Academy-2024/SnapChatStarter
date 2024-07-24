import { Text, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../utils/hooks/supabase';
import { useAuthentication } from "../utils/hooks/useAuthentication";
import {useState, useEffect} from 'react';

export default function SettingsScreen() {
    const { user } = useAuthentication()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (user !==  null) {
            setLoading(false);
        }
    }, [user]);
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
    console.log({user})
    if(!loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Account Settings
                </Text>
                <View style={styles.settingBar}>
                    <Text>
                        Display Name
                    </Text>
                    <Text style={styles.databaseData}>
                        {user.email.split('@')[0]}
                    </Text>
                </View>
                <View style={styles.settingBar}>
                    <Text>
                        Email
                    </Text>
                    <Text style={styles.databaseData}>
                        {user.email}
                    </Text>
                </View>
                <Button
                    onPress={handleSignOut} title="Log Out"
                    style={styles.button}
                />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingTop: 15,
        alignItems: "left"
    },
    title: {
      fontSize: 18
    },
    settingBar: {
        marginTop: 10
    },
    databaseData: {
        color: "grey"
    },
    button: {
    }
})