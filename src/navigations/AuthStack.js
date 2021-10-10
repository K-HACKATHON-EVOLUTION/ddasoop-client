import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Signup } from "../screens";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
        headerStyle: {
          height: Platform.OS === "ios" ? 110 : 70,
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.headerTintColor,
          fontSize: 25,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerBackImage: () => {
          const style = {
            marginRight: 5,
            marginLeft: Platform.OS === "ios" ? 15 : 0,
          };
          return (
            <AntDesign name="left" size={25} color={theme.headerTintColor} style={style} />
          );
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={Signup} options={{ headerTitle: '회원가입' }}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
