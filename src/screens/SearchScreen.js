import { color } from "@rneui/base";
import { Image, Platform, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useState, useEffect} from "react";
import { Pressable, FlatList, Item} from "react-native";
import {supabase} from '../utils/hooks/supabase';


const Stack = createStackNavigator();

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersToAdd, setUsersToAdd] = useState([]);
  useEffect(() => {
      // Function to fetch todos
      async function fetchUsers() {
      try {
          const { data, error } = await supabase
          .from('usersToAdd')
          .select('*')
          .limit(8);
          if (error) {
          console.error('Error fetching users:', error.message);
          return;
          }
          if (data) {
              setUsersToAdd(data);
              console.log(data)
          }
      } catch (error) {
          console.error('Error fetching users:', error.message);
      }
      }
      // Call the fetchTodos function
      fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 4,
        alignItems: "center",
        width: "50%",
        flexDirection:"row",
        height: 50,
        gap: 10,
        }}>
      <Image 
      source={{uri: item.profile_picture}}
      style={{width:50, height:50, borderRadius:50,}}
      />
      <Text >{item.name}</Text>
    </View>
  );


  return (
    <View styles={{ alignItems: "center" }}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SearchBar
            containerStyle={{
              flex: 1,
              width: 100,
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
            }}
            inputContainerStyle={{height: 40, backgroundColor: "#EBECEE"}}
            width="100"
            placeholder="Search"
            lightTheme="true"
            round="true"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("UserTab");
            }}
          >
            <Text style={{fontWeight:"bold"}}> Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      
      {/* <Image
        source={{uri: usersToAdd[0].profile_picture}}
        style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
      /> */}
      <Text style={{paddingLeft:10, fontWeight:"bold"}}>Best Friends</Text>
      <FlatList
        style={{marginLeft:10, marginRight:10}}
        data={usersToAdd}
        renderItem={renderItem}
        keyExtractor={(item) => item.Username}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{alignItems: "center"}}
        scrollEnabled={false}
        // ItemSeparatorComponent={() => <View style={{height: -50, width:"50%", gap:10}} />}
        
      />
      <Text styles={{ justifyContents: "center" }}>Search results</Text>
      {/* <Text> {usersToAdd[0].name} 
      </Text> */}
    </View>
  );
}
 let Fakeusers = [
    { Name: "Julissa", Username: "Julissahhh", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Pisces" },
    { Name: "Kyle", Username: "KyleisBrittish", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Sagittarius" },
    { Name: "Allison", Username: "allyhua", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Leo" },
    { Name: "Demani", Username: "Demanigames", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Gemini" },
    { Name: "Malena", Username: "malena_lodi", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Cancer" },
    { Name: "Alexis", Username: "Coach_Alexis", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Leo" },
    { Name: "Phoenix", Username: "Arizona", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Libra" },
    { Name: "Bee", Username: "Buzzing_Bee", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Libra" },
    { Name: "Jay", Username: "Jaysitoe", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Aries" },
    { Name: "Cindy", Username: "cindya_who", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Sagittarius" },
    { Name: "Luis", Username: "Lulu_boba", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Virgo" },
    { Name: "Sedrick", Username: "seddiemac", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Pisces" },
    { Name: "Sona", Username: "son-sar", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Sagittarius" },
    { Name: "Masiel", Username: "mmasiell", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Cancer" },
    { Name: "Areli", Username: "simplyarelia", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Leo" },
    { Name: "Christian", Username: "o-1starscream", ProfilePic: require("../../assets/snapchat/defaultprofile.png"), Starsign: "Libra" },
  ];