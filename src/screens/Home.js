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
          style={{ marginLeft: 15 }}
          onPress={() => navigation.navigate("Setting")}
        />
      ),
      headerRight: ({ tintColor }) => (
        <AntDesign
          name="bells"
          size={25}
          color={tintColor}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Alert")}
        />
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tree")}
            style={styles.touchable}
          >
            <Image source={{ uri: user?.treeImg }} style={styles.tree} />
          </TouchableOpacity>
          <Text style={styles.title}>{user?.totalCarbon}kg</Text>
          <Text style={styles.subtitle}>총 탄소저감량</Text>
          <Feather
            name="chevrons-down"
            color="#848484"
            size={25}
            style={{ marginBottom: 10 }}
          />
          <Feather
            name="chevrons-down"
            color="#848484"
            size={25}
            style={{ marginBottom: 10 }}
          />
          <Feather
            name="chevrons-down"
            color="#848484"
            size={25}
            style={{ marginBottom: 10 }}
          />
          <Image
            source={require("../../assets/graph.png")}
            style={{ marginTop: 180, marginBottom: 60 }}
          />
          <Image
            source={require("../../assets/calendar.png")}
            style={{ marginBottom: 20 }}
          />
        </View>
      </ScrollView>
      <View style={styles.bar}>
        <TouchableOpacity onPress={() => navigation.navigate("CourseMain")}>
          <Image
            source={require("../../assets/course.png")}
            style={{ marginTop: 18, marginRight: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CourseMain")}>
          <Image
            source={require("../../assets/start.png")}
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("GroupList")}>
          <Image
            source={require("../../assets/group.png")}
            style={{ marginTop: 18, marginLeft: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#848484",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 100,
    color: "gray",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    height: 85,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    margin: 170,
    height: 200,
    width: 200,
  },
  tree: {
    backgroundColor: "#ffffff",
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
});

export default Home;
