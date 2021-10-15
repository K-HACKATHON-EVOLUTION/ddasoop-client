import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
import { UserContext } from "../contexts";
import TreePolar from "../components/TreePolar";
import TreeName from "../components/TreeName";

const Tree = () => {
  const { user } = useContext(UserContext);
  const trees = user?.trees;
  const treesAmount = user?.trees.length;
  const treeImg = trees[treesAmount - 1].treeImg;
  const needCarbon = (10 - trees[treesAmount - 1].treeCarbon).toFixed(3);
  const [treeName, setTreeName] = useState(trees[treesAmount - 1].treeName);
  
  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <View style={styles.container}>
        <Image source={{ uri: treeImg }} style={styles.tree} />
        <TreeName
            value={treeName}
            onChangeText={(text) => setTreeName(text)}
            placeholder={treeName}
          />
        <Text style={styles.title}>{needCarbon}kg</Text>
        <Text style={styles.subtitle}>나무 완성까지</Text>
        
        <View style={styles.photos}>
          {trees.slice(0,treesAmount-1).map((tree) => (
            <TreePolar
              key={tree.treeIdx}
              treeName={tree.treeName}
              treeImg={tree.treeImg}
            />
          ))}
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10
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
