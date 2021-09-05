import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Alert, Setting } from '../screens';
import { AntDesign } from '@expo/vector-icons'; 
import GroupStack from './GroupStack';
import CourseStack from './CourseStack';
import TreeStack from './TreeStack';
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
      <Stack.Screen name="Home" component={Home} options={{ headerTitle: '따숲' }} />
      <Stack.Screen name="GroupList" component={GroupStack} options={{ headerShown: false }} />
      <Stack.Screen name="CourseMain" component={CourseStack} options={{ headerShown: false }} />
      <Stack.Screen name="Tree" component={TreeStack} options={{ headerShown: false }} />
      <Stack.Screen name="Alert" component={Alert} options={{ headerTitle: '알림' }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerTitle: '설정' }} />      
    </Stack.Navigator>
  );
};

export default MainStack;