import { useState, useEffect } from "react";
import { Image , Text, View, ActivityIndicator } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function ProfileScreen(){
    const { user } = useAuthentication() 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user !==  null) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }

    if (!loading) {
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
    }
};