import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, GroupList, Group } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Platform } from 'react-native';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {backgroundColor: "#ffffff"},
        headerStyle: {
            height: 110,
            backgroundColor: '#95a5a6',
            borderBottomWidth: 5,
            borderBottomColor: '#34495e',
        },
        headerTitleStyle: { color: '#ffffff', fontSize: 24 },
        headerTitleAlign: 'center',
        headerTintColor: '#ffffff',
        headerBackImage: ({ tintColor }) => {
            const style = {
                marginRight: 5,
                marginLeft: Platform.OS === 'ios' ? 11 : 0,
            };
            return (
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  size={30}
                  color={tintColor}
                  style={style}
                />
            );
        }
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerTitle: '따숲' }} />
      <Stack.Screen name="GroupList" component={GroupList} options={{ headerTitle: '숲' }} />
      <Stack.Screen name="Group" component={Group} options={{ headerTitle: '숲 상세 보기' }} />
    </Stack.Navigator>
  );
};

export default MainStack;