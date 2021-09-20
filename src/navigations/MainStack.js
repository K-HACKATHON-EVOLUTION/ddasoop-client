import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Tree, GroupList, Group, Alert, Setting, Log, CourseMain } from "../screens";
import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import { UserContext } from "../contexts";

const MainStack = () => {
  const { user } = useContext(UserContext);
  const Stack = createStackNavigator();

  // console.log(user?.uid);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { backgroundColor: "#ffffff" },
        headerStyle: {
          height: 110,
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
        name="Home"
        component={Home}
        options={{ headerTitle: "따숲" }}
      />

      <Stack.Screen
        name="GroupList"
        component={GroupList}
        options={{ headerTitle: "숲" }}
      />
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ headerTitle: "숲 상세 보기" }}
      />

      <Stack.Screen
        name="CourseMain"
        component={CourseMain}
        options={{ headerTitle: "코스" }}
      />
      <Stack.Screen
        name="Tree"
        component={Tree}
        options={{ headerTitle: "나의 나무" }}
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
        name="Setting"
        component={Setting}
        options={{ headerTitle: "설정" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
