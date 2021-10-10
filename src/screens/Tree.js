import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import { UserContext } from "../contexts";
import axios from "axios";
import TreePolar from "../components/TreePolar";

const Tree = () => {
  const { user } = useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: user?.treeImg }} style={styles.tree} />
        <Text style={styles.subtitle}>나무 완성까지</Text>
        <Text style={styles.title}>{10 - (user?.totalCarbon % 10)}kg</Text>
        <View style={styles.photos}>
          <TreePolar name={"qkqh"}></TreePolar>
          <TreePolar name={"qkqh"}></TreePolar>
          <TreePolar name={"qkqh"}></TreePolar>
          <TreePolar name={"qkqh"}></TreePolar>
          <TreePolar name={"qkqh"}></TreePolar>
          <TreePolar name={"qkqh"}></TreePolar>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },
  tree: {
    resizeMode: "contain",
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#848484",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
  },
  photos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  }
});

export default Tree;
