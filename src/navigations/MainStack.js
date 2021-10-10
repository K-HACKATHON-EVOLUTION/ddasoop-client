import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Tree, Alert, Log, Start, CourseList, Course, Group, GroupSetting, CreateGroup, MemberSetting } from "../screens";
import { AntDesign } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { UserContext } from "../contexts";
import Drawer from "./Drawer";

const MainStack = () => {
  const { user } = useContext(UserContext);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { backgroundColor: "#ffffff" },
        headerStyle: {
          height: Platform.OS === "ios" ? 110 : 70,
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          color: "#9CC27E",
          fontSize: 25,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerTintColor: "#848484",
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => {
          const style = {
            marginRight: 5,
            marginLeft: Platform.OS === "ios" ? 15 : 0,
          };
          return (
            <AntDesign name="left" size={25} color={tintColor} style={style} />
          );
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tree"
        component={Tree}
        options={{ headerTitle: "나의 나무" }}
      />
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ headerTitle: "숲 상세 보기" }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{ headerTitle: "숲 만들기" }}
      />
      <Stack.Screen
        name="GroupSetting"
        component={GroupSetting}
        options={{ headerTitle: "숲 설정" }}
      />
      <Stack.Screen
        name="MemberSetting"
        component={MemberSetting}
        options={{ headerTitle: "그룹원 설정" }}
      />
      <Stack.Screen
        name="Log"
        component={Log}
        options={{ headerTitle: "기록 상세 보기" }}
      />
      <Stack.Screen
        name="Alert"
        component={Alert}
        options={{ headerTitle: "알림" }}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ headerTitle: "기록하기" }}
      />
      <Stack.Screen
        name="CourseList"
        component={CourseList}
        options={{ headerTitle: "코스" }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{ headerTitle: "코스 상세 보기" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
