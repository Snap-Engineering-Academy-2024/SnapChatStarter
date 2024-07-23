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
};