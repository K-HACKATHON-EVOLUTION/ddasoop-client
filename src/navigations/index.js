import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Navigation = () => {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  };
  
  export default Navigation;