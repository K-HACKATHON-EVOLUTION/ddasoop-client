import React, { useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { UserContext } from "../contexts";

const Home = ({ navigation }) => {
  const { user } = useContext(UserContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: "#848484",
      headerLeft: ({ tintColor }) => (
        <AntDesign
          name="setting"
          size={25}
          color={tintColor}
          style={{ marginLeft: 20 }}
          onPress={() => navigation.navigate("Setting")}
        />
      ),
      headerRight: ({ tintColor }) => (
        <AntDesign
          name="bells"
          size={25}
          color={tintColor}
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Alert")}
        />
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Tree")}
          style={styles.touchable}
        >
          <Image source={{ uri: user?.treeImg }} style={styles.tree} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LogList")}>
        <Image
          source={require("../../assets/calendar.png")}
          style={{ marginBottom: 20 }}
        />
        </TouchableOpacity>

      </View>
      <View style={styles.bar}>
        <AntDesign
          name="setting"
          size={30}
          onPress={() => navigation.navigate("CourseMain")}
        />
        <AntDesign
          name="setting"
          size={30}
          onPress={() => navigation.navigate("CourseMain")}
        />        
        <AntDesign
          name="setting"
          size={30}
          onPress={() => navigation.navigate("GroupList")}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // title: {
  //   fontSize: 25,
  //   marginBottom: 5,
  //   fontWeight: "bold",
  //   color: "#848484",
  // },
  // subtitle: {
  //   fontSize: 15,
  //   marginBottom: 100,
  //   color: "gray",
  // },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    height: 85,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    paddingTop: 20
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
    height: 200,
    width: 200,
  },
  tree: {
    backgroundColor: "#ffffff",
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
});

export default Home;
