import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";

// Components
import ReturnButton from "../components/ReturnButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth();

  function createUser(email, uid) {
    setDoc(doc(db, "Users", uid), {
      _id: uid,
      name: email,
    });
  }

  async function handleSubmit() {
    console.log("handle submit envoked!!");

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // creates user using setDoc firebase
        createUser(userCredential.user.email, userCredential.user.uid);
        const user = userCredential.user;
        auth.currentUser = user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, "<---- error code");
        console.log(errorMessage, "<--- error message");
      });
  }

  return (
    <View style={styles.signUpScreen}>
      <ReturnButton navigation={navigation} returnName={"AuthHome"} />
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <View style={styles.signUpFields}>
        <Text style={styles.inputText}>USERNAME OR EMAIL</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={false}
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={styles.inputText}>PASSWORD</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)}
        />
        <Text style={styles.disclaimerText}>
          By tapping Sign Up & Accept, you acknowledge that you have read the{" "}
          <Text style={styles.blueText}>Privacy Policy</Text> and agree to the{" "}
          <Text style={styles.blueText}>Terms of Service</Text>.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.signUpText}>{"Sign Up & Accept"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  signUpTitle: {
    position: "absolute",
    top: 150,
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 2,
  },
  signUpFields: {
    width: 250,
    height: 80,
    position: "absolute",
    top: 200,
  },
  inputText: {
    marginBottom: 20,
    color: "#b1b1b1",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  inputField: {
    borderBottomColor: "#aeb5bf",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontWeight: "600",
  },
  disclaimerText: {
    position: "absolute",
    top: 135,
    fontSize: 12,
  },
  blueText: {
    color: "#2b83b3",
  },
  signUpButton: {
    padding: 15,
    backgroundColor: "#aeb5bf",
    width: 250,
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 25,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },
});
