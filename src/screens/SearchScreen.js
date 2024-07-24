// import { color } from "@rneui/base";
import { Image , Platform, Text, View} from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useState } from "react";
import { Pressable } from "react-native";
const Stack = createStackNavigator();

export default function SearchScreen(){
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
return(
    <View styles={{alignItems:"center"}}>
    <SafeAreaView>
        <View style={{flexDirection:"row", justifyContent:"space-between", gap:10, alignItems:"center", paddingLeft:10, paddingRight:10}}>
        <SearchBar
        containerStyle={{flex:1, width:100}}
        width = "100"
        placeholder="Search"
        lightTheme = "true"
        round = "true"
        value={searchQuery}
        onChangeText={setSearchQuery}
        />
        <Pressable
        onPress={() =>{
            navigation.navigate("UserTab");
        }}
        >
        <Text>Cancel</Text>
        </Pressable>  
        </View>

    </SafeAreaView>
    <Image 
    source={{uri:"https://loremflickr.com/cache/resized/65535_52294428543_2d04971c12_n_320_240_nofilter.jpg"}}
    style={{width: 400, height: 400, borderRadius: 400/ 2}} 
    />
    <Text 
        styles={{justifyContents:"center"}}>
        Search results
    </Text>
    </View>
);
};

