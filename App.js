import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from "./src/utils/firebase.js";

export default class extends React.Component {
  make = async() => {
    var user = {
      name: "Surim Son",
      age: 22
    };
    const res = await db.collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
  })
    console.log(res);
  }
  componentDidMount() {
    this.make();
  }
  render(){
  console.log("asdf");
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
