<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Image , Text, View, ActivityIndicator } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function ProfileScreen(){
    const { user } = useAuthentication()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user !==  null) {
            setLoading(false);
            console.log("USER", user)
        }
    }, [user]); // rerenders when user is updated, when getting user data loading is true and buffering sign is returned, when user data is obtained loading is updated to false and username output is returned

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }

    return(
        <View styles={{alignItems:"center"}}>
            <Image 
            source={{uri:"https://loremflickr.com/cache/resized/65535_52294428543_2d04971c12_n_320_240_nofilter.jpg"}}
            style={{width: 400, height: 400, borderRadius: 400/ 2}} 
            />
            <Text 
                style={{
                    justifyContents:"center",
                    textAlign:"center"
                }}>
                {user.user_metadata.email.slice(0, user.user_metadata.email.indexOf("@"))}
            </Text>
        </View>
    );       
=======
import { Image , Text, View, Button} from "react-native";
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

export default function ProfileScreen(){
return(
    <View styles={{alignItems:"center"}}>
    <Image 
    source={{uri:"https://loremflickr.com/cache/resized/65535_52294428543_2d04971c12_n_320_240_nofilter.jpg"}}
    style={{width: 400, height: 400, borderRadius: 400/ 2}} 
    />
    <Text 
        styles={{justifyContents:"center"}}>
        User Name Would Go Here
    </Text>
    <Button onPress={handleSignOut} title="Log Out" />
    </View>
);
>>>>>>> 91cc52acb7addbb894744e82d1070b8e9066647d
};