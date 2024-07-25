// import { Image , Text, View} from "react-native";

// export default function AddFriendScreen(){
// return(
//     <View styles={{alignItems:"center"}}>
//     <Image 
//     source={{uri:"https://loremflickr.com/cache/resized/65535_52294428543_2d04971c12_n_320_240_nofilter.jpg"}}
//     style={{width: 400, height: 400, borderRadius: 400/ 2}} 
//     />
//     <Text 
//         styles={{justifyContents:"center"}}>
//         THIS IS A TEST Name Would Go Here
//     </Text>
//     </View>
// );
// };
import React from 'react';
import {SectionList, StyleSheet, Text, View, ScrollView} from 'react-native';
import AddFriendBitmoji from "../components/AddFriendBitmoji";

const styles = StyleSheet.create({
    container: {
              flex: 1,
            },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  storyBar: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
        },
  stories: {
        gap: 20,
        // height: 150,
        marginLeft: 10, 
        marginRight: 20,
        },
        list: {
            marginTop: 0,
        },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
        <Text style= {{textAlign: "center", fontSize:25, marginTop: 20}}>Quick Add</Text>
        <ScrollView
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stories}
          >
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
            <AddFriendBitmoji />
          </ScrollView>

      <SectionList style={styles.list}
        sections={[
        //   {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'Other People You Might Know',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     contentContainer: {
//       padding: 12,
//       display: "flex",
//       flexDirection: "column",
//       gap: 12,
//     },
//     storyBar: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "flex-start",
//       gap: 4,
//     },
//     discoverContent: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     stories: {
//       display: "flex",
//       gap: 12,
//       width: "100%",
//     },
//     DiscoveryContainer: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//     },
//     sectionHeader: {
//       textAlign: "left",
//       paddingVertical: 4,
//       color: colors.primary,
//       fontSize: fontHeader.fontSize,
//       fontFamily: fontHeader.fontFamily,
//       fontWeight: fontHeader.fontWeight,
//     },
//   });
  

export default SectionListBasics;