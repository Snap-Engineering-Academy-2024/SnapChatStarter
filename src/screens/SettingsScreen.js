import { Text, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../utils/hooks/supabase';
import { useAuthentication } from "../utils/hooks/useAuthentication";
import {useState, useEffect} from 'react';

export default function SettingsScreen() {
    const { user } = useAuthentication()
    //async function --> make sure screen is
    // rendered by using loading flag
        // checks ? is useAUthentication finished? if true render


    const [loading, setLoading] = useState(true) 
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        if (user) {
          const { data, error } = await supabase
            .from('profiles') // Replace with your table name
            .select('*') // this nis where I can do sql funnies
            .eq('id', user.id); // Adjust the column name if necessary
  
          if (error) {
            console.error('Error fetching user data:', error);
          } else {
            setUserData(data[0] ?? null);
          }
          setLoading(false);
        }
      };

      //will write to table, ensure proper syntax beforehand?
      // can rewrite this to include different fields (email, username, DOB, etc.)
    const updateUserEmail = async (newEmail) => {
        if (user) {
          try {
            const { data, error } = await supabase
              .from('profiles') // Replace with your table name
              .update({ email: newEmail }) // Update the email column
              .eq('id', user.id); // Match the user ID
      
            if (error) {
              console.error('Error updating user email:', error);
            } else {
              console.log('User email updated:', data);
            }
          } catch (error) {
            console.error('Error:', error.message);
          }
        }
      };

    
    useEffect(() => {
        if (user !==  null) {
            setLoading(false);
            fetchUserData();

            // let copy = userData;

            
            // for (const [key, value] of Object.entries(user)) {
            //     console.log(`${key}: ${value}`);
            //   }
            // console.log("hi");
            console.log(JSON.stringify(userData, null, 4))

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

    //console.log({user})
    // console.log({userData});

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