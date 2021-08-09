import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GroupList, Group } from '../screens';
import { AntDesign } from '@expo/vector-icons'; 

import { Platform } from 'react-native';

const Stack = createStackNavigator();

const GroupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GroupList"
      screenOptions={{
        cardStyle: {backgroundColor: "#ffffff"},
        headerStyle: {
            height: 110,
            backgroundColor: '#ffffff'
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
      <Stack.Screen name="GroupList" component={GroupList} options={{ headerTitle: '숲' }} />
      <Stack.Screen name="Group" component={Group} options={{ headerTitle: '숲 상세 보기' }} />   
    </Stack.Navigator>
  );
};

export default GroupStack;