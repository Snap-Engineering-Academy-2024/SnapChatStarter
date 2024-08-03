// import { Image, Text, View, Button, StyleSheet, TouchableOpacity} from "react-native";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import Popup from "../components/Popup";



// export default function CommSelectionScreen() {
//   const navigation = useNavigation();
//   const [popupTrigger, setPopupTrigger] = useState(false);


//   return (
//     <View style={{ alignItems: "center" }}>

//         <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
//           <Text style={{fontSize: 20}}>Community Ping!</Text>
//           <TouchableOpacity 
//           style={styles.buttonStyle2} 
//           onPress={() => {
//             navigation.navigate("Profile");
//           }}>

//           <Text style={styles.buttonText2}>Check Out New Feature!</Text>

//           </TouchableOpacity>
//         </Popup>
//         <TouchableOpacity onPress={() => setPopupTrigger(true)} style={styles.button}>
//           <Text style={styles.text}>Show Popup</Text>
//         </TouchableOpacity>


//       <Image
//         source={{ uri: "https://pbs.twimg.com/media/FULacdXX0AMqQKq?format=jpg&name=4096x4096" }}
//         style={{ width: 350, height: 200, borderRadius: 25}}
//       />
//       <Text style={{marginTop: 20}}>Welcome to Commnity Ping ~ Where you can join your community and find others in your area that share similar interests with you.</Text>
      
//       <Text style={{justifyContents: "center", fontWeight: "bold", fontSize: 25, marginTop: 50}}>
//         Chose your Community!</Text>
      
//         <TouchableOpacity 
//           style={styles.buttonStyle2} 
//           onPress={() => {
//             navigation.navigate("Profile");
//           }}>
            
//           <Text onPress={() => setPopupTrigger(true)} style={styles.buttonText2}> Transgender</Text>
//           </TouchableOpacity>


//           <TouchableOpacity 
//           style={styles.buttonStyle2} 
//           onPress={() => {
//             navigation.navigate("Profile");
//           }}>
//           <Text style={styles.buttonText2}> Pangender</Text>
//           </TouchableOpacity>

          
//     </View>
//   );
// }



// const styles = StyleSheet.create({
//     container: {
//         width: "100%",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     avatar: {
//         width: 150,
//         height: 150,
//         borderRadius: 150 / 2,
//         alignItems: "center",
//     },
//     buttonStyle2: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: 10,
//       paddingVertical: 70,
//       paddingHorizontal: 50,
//       borderRadius: 200,
//       elevation: 3,
//       backgroundColor: '#FFFC00',
//       borderColor: 'black',
//       borderWidth: 1,
      
//     },
//     buttonText2: {
//       fontSize: 20,
//       lineHeight: 21,
//       letterSpacing: 0.5,
//       color: 'black',
//     },
// })


import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PopupCommInfo from "../components/PopupCommInfo";

export default function CommSelectionScreen() {
  const navigation = useNavigation();
  const [popupTrigger, setPopupTrigger] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PopupCommInfo trigger={popupTrigger} setTrigger={setPopupTrigger}>
        <Text style={{ fontSize: 20 }}> - Transgender Community - </Text>
        <Text>Information about the transgender community</Text>
        <TouchableOpacity
          style={styles.buttonStyle3}
        
        >
          <Text style={styles.buttonText3}>Join Community</Text>
        </TouchableOpacity>
      </PopupCommInfo>
    

      <Image
        source={{
          uri: "https://pbs.twimg.com/media/FULacdXX0AMqQKq?format=jpg&name=4096x4096",
        }}
        style={{ width: 350, height: 200, borderRadius: 25 }}
      />
      <Text style={{ marginTop: 20 }}>
        Welcome to Community Ping ~ Where you can join your community and find
        others in your area that share similar interests with you.
      </Text>

      <Text
        style={{
          justifyContents: "center",
          fontWeight: "bold",
          fontSize: 25,
          marginTop: 50,
        }}
      >
        Choose your Community!
      </Text>

      <TouchableOpacity
        style={styles.buttonStyle2}
        onPress={() => setPopupTrigger(true)}
      >
        <Text style={styles.buttonText2}>
          Transgender
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle2}
        onPress={() => setPopupTrigger(true)}
      >
        <Text style={styles.buttonText2}>
          Pangender
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
  },
  buttonStyle2: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 70,
    paddingHorizontal: 50,
    borderRadius: 200,
    elevation: 3,
    backgroundColor: "#FFFC00",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText2: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: "black",
  },
  buttonStyle3: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#FFFC00",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText3: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: "black",
  },
});
