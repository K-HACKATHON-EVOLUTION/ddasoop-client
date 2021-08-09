import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseMain } from '../screens';
import { AntDesign } from '@expo/vector-icons'; 

import { Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const Stack = createStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CourseMain"
      screenOptions={{
        cardStyle: {backgroundColor: "#ffffff"},
        headerStyle: {
            height: 110,
            backgroundColor: '#ffffff',
        },
        headerTitleStyle: { color: '#9CC27E', fontSize: 25, fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerTintColor: '#848484',
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => {
            const style = {
                marginRight: 5,
                marginLeft: Platform.OS === 'ios' ? 15 : 0,
            };
            return (
                <AntDesign
                  name="left"
                  size={25}
                  color={tintColor}
                  style={style}
                />
            );
        }
      }}
    >
        <Stack.Screen name="CourseMain" component={CourseMain} options={{ headerTitle: '코스 모아보기' }} />
    </Stack.Navigator>
  );
};

export default CourseStack;