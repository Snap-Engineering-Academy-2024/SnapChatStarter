import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "@rneui/themed";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { findJoinStatus } from "../utils/hooks/findJoinStatus";
import ProfileSections from "../components/ProfileSections";
import CompanyPageHeader from "../components/CompanyPageHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScreenWidth } from "@rneui/base";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const SelectorButton = ({ title, onPress, isActive }) => {
    return (
      <TouchableOpacity
        style={[styles.button, isActive && styles.buttonActive]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

export default function CompanyPageScreen() {
    const route = useRoute();
    const { selectedCompany } = route.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const sheetRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('Stories');

    const handlePress = (option) => {
        setSelectedOption(option);
      };

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: insets.top }}>
                <CompanyPageHeader />
            </View>
            <BottomSheet
                ref={sheetRef}
                index={3}
                snapPoints={["35", "45", "55", "65", "75", "85"]}
            >
                <View style={styles.logoAndName}>
                    <TouchableOpacity
                        style={styles.title}
                        onPress={() => {
                            navigation.navigate("CompanyPage", { selectedCompany });
                        }}
                    >
                        <Image
                            style={styles.bitmojiImage}
                            source={{ uri: selectedCompany.logo_url }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.title}
                        onPress={() => {
                            navigation.navigate("CompanyPage", { selectedCompany });
                        }}
                    >
                        <Text style={styles.title}>{selectedCompany.username}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <Button buttonStyle={styles.subscribe}>
                        <Icon name="bookmark-add" size={20} color={"white"} />
                        <Text style={{ color: "white", fontSize: 20 }}>Subscribe</Text>
                    </Button>
                    <TouchableOpacity style={styles.expand}>
                        <Icon name="expand-circle-down" size={60} color={"lightgray"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.selectorButtonContainer}>
      <SelectorButton
        title="Stories"
        onPress={() => handlePress('Stories')}
        isActive={selectedOption === 'Stories'}
      />
      <SelectorButton
        title="Communities"
        onPress={() => handlePress('Communities')}
        isActive={selectedOption === 'Communities'}
      />
      </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomsheet: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    content: {
        backgroundColor: "white",
        padding: 25,
        height: SCREEN_HEIGHT,
        borderRadius: 25,
        alignItems: "center",
        top: SCREEN_HEIGHT / 3.5,
    },
    bitmojiImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    logoAndName: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingLeft: 10,
        paddingBottom: 150
      },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "black",
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
      },
      subscribe: {
        height: 50,
        width: ScreenWidth / 1.25,
        paddingHorizontal: 20,
        justifyContent: "center",
        marginBottom: 16,
        borderRadius: 20,
        backgroundColor: "#10adff",
        gap: 5,
        marginRight: 5,
      },
      expand:{
        paddingBottom: 15
      },
      button: {
        padding: 10,
        borderRadius: 5,
        width: SCREEN_WIDTH / 2,
        alignItems: "center"
      },
      buttonActive: {
        borderBottomColor: "black",
        borderBottomWidth: 4
      },
      buttonText: {
        fontSize: 20,
        fontWeight: "bold"
      },
      selectorButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

