
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
        marginLeft: 15, 
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
  footer: {
    height: 30,
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
          </ScrollView>

      {/* <SectionList style={styles.list}
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
      /> */}
      <View style={styles.footer}>
    {/* footer content */}
  </View>
    </View>
  );
};


export default SectionListBasics;