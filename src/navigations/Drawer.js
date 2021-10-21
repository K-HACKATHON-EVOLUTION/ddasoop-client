import React, { useContext } from "react";
import { createDrawerNavigator, DefaultTheme } from '@react-navigation/drawer';
import MainStack from "./MainStack";
import { Home, Tree, GroupList, Group, Alert, Setting, Log, CourseMain, LogList, BadgeList } from "../screens";

const drawer = createDrawerNavigator();

const Drawer = () => {
    return (
        <drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#ffffff',
                    width: 200, 
                },
                drawerActiveTintColor: "#fff",
                drawerActiveBackgroundColor: "#9CC27E",
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

            <drawer.Screen
                name="홈"
                component={Home}
                options={{ headerTitle: "따숲" }}
            />
            <drawer.Screen
                name="나의 나무"
                component={Tree}
                options={{ headerTitle: "나의 나무" }}
            />
            <drawer.Screen
                name="나의 기록"
                component={LogList}
                options={{ headerTitle: "나의 기록" }}
            />
            <drawer.Screen
                name="나의 뱃지"
                component={BadgeList}
                options={{ headerTitle: "나의 뱃지" }}
            />
            <drawer.Screen
                name="숲"
                component={GroupList}
                options={{ headerTitle: "숲" }}
            />
            <drawer.Screen
                name="코스"
                component={CourseMain}
                options={{ headerTitle: "코스 모아보기" }}
            />
            <drawer.Screen
                name="설정"
                component={Setting}
                options={{ headerTitle: "설정" }}
            />
        </drawer.Navigator>
    );
};

export default Drawer;
