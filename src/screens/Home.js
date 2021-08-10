import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons'; 

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: '#848484',
      headerLeft: ({ tintColor }) => (
        <AntDesign
          name="setting"
          size={25}
          color={tintColor}
          style={{ marginLeft: 15 }}
          onPress={()=>navigation.navigate('Setting')}
        />
      ),
      headerRight: ({ tintColor }) => (
        <AntDesign
        name="bells"
        size={25}
        color={tintColor}
        style={{ marginRight: 15 }}
        onPress={()=>navigation.navigate('Alert')}
      />
      )
    })
  }, [])
    return (
      <ScrollView>
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate('Tree')}>
              <Image source={require('../../assets/maintree.png')} style={{ margin: 250 }}/>
            </TouchableOpacity>
            <Button
              title="코스"
              onPress={() => navigation.navigate('CourseMain')}
            />
            <Button
              title="숲"
              onPress={() => navigation.navigate('GroupList')}
            />
            <Feather name="chevrons-down" size={25} />
            <Feather name="chevrons-down" size={25} />
            <Feather name="chevrons-down" size={25} />

        </Container>
      </ScrollView>
    );
};

export default Home;