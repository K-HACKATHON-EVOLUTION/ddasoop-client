import React, { useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { UserContext } from "../contexts";
import { AdBanner, Shortcut, HomeTree } from "../components";

const Home = ({ navigation }) => {
  const { user } = useContext(UserContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: "#848484",
      headerLeft: ({ tintColor }) => (
        <Feather
          name="menu"
          size={25}
          color={tintColor}
          style={{ marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
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
      <HomeTree navigation={navigation} />
      <View style={styles.wrapper}>
        <Shortcut title="나의 숲 바로가기" />
        <Shortcut title="이번 주 1위 코스 바로가기" />
      </View>
      {/* <AdBanner/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "white"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 110
  },
  touchable: {
    alignItems: "center",
    backgroundColor: "black",
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
