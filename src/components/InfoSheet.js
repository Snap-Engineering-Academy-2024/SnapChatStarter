import React, { useEffect, useState } from "react";
import { BottomSheet, Button } from "@rneui/themed";
import { Dimensions, StyleSheet, Text, View,Linking, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { supabase } from "../utils/hooks/supabase";

// Height for BottomSheet
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const getCompanyInfo = async (companyId) => {
  try {
    const { data, error } = await supabase
      .from('company_profiles')
      .select('header_url, communities, logo_url, website_url, event_url, event_description, username')
      .eq('id', companyId); // Replace 'companyId' with your actual variable

    if (error) {
      console.error('Error fetching company photo:', error);
      return null; // Handle error gracefully (display default image, etc.)
    }

    if (data.length === 0) {
      console.warn('No company found with ID:', companyId);
      return null; // Handle no company found scenario
    }
    console.log(data[0].event_description)
    return data[0];
  } catch (error) {
    console.error('Unexpected error:', error);
    return null; // Handle unexpected errors
  }
};

const InfoSheet = ({ showAbout, setShowAbout, companyId = "ceaeddd9-175c-4f63-b2e2-69e9896bdab0" }) => {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [eventURL, setEventUrl] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [companyPhotoUrl, setCompanyPhotoUrl] = useState(null);
  const [companyName, setCompanyName] = useState(null)

  useEffect(() => {
    const setInfo = async () => {
      const info = await getCompanyInfo(companyId);
      setCompanyPhotoUrl(info.header_url);
      setEventUrl(info.event_url)
      setEventDescription(info.event_description)
      setCompanyName(info.username)
    };

    if (companyId) {
      setInfo();
    }
  }, [companyId]);

  return (
    <BottomSheet isVisible={showAbout} containerStyle={styles.container} modalProps={{}}>
      <View style={styles.content}>
      {companyPhotoUrl && (
          <Image source={{ uri: companyPhotoUrl }} style={styles.companyPhoto} />
        )}
        <Text style={styles.title}>{companyName}</Text>
        <Text style={styles.text}>
        {eventDescription}
        </Text>
        <View style={[styles.buttonsView]}>
            <Button
              onPress={() => {
                setShowAbout(false);
                Linking.openURL(eventURL);
              }}
              title={"LEARN MORE"}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              accessibilityLabel="Click to join SnapTogether"
            />
          <Button
            onPress={() => {
              setShowAbout(false);
            }}
            title={"CLOSE"}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            accessibilityLabel="Close Bottomsheet"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    height: SCREEN_HEIGHT,
    borderRadius: 25,
    alignItems: "center",
    top: SCREEN_HEIGHT / 100,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 50,
    marginBottom: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#10adff",
    marginBottom: 16,
    borderRadius: 15,
    width: 100,
  },
  buttonText: {
    color: "white",
  },
  buttonsView: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between" 
  },
  companyPhoto: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginBottom: 16,
  },
});

export default InfoSheet;
