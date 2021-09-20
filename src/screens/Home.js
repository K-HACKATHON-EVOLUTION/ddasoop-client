import React, { useContext, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import { UserContext } from "../contexts";
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TitleText = styled.Text`
  font-size: 25px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #848484;
`;
const SubText = styled.Text`
  font-size: 15px;
  color: gray;
  margin-bottom: 80px;
`;

const Home = ({ navigation }) => {
  const { user } = useContext(UserContext);

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
      <Container>
        <ScrollView style={{width:'100%'}}>
          <Container>
              <TouchableOpacity onPress={() => navigation.navigate('Tree')}>
                <Image source={require('../../assets/maintree.png')} style={{ marginTop: 180, marginBottom: 80 }}/>
              </TouchableOpacity>
              <TitleText>9.87kg</TitleText>
              <SubText>총 탄소저감량</SubText>
              <Feather name="chevrons-down" color='#848484' size={25} style={{marginBottom: 10}} />
              <Feather name="chevrons-down" color='#848484' size={25} style={{marginBottom: 10}} />
              <Feather name="chevrons-down" color='#848484' size={25} style={{marginBottom: 10}} />
              <Image source={require('../../assets/graph.png')} style={{ marginTop: 180, marginBottom: 60 }}/>
              <Image source={require('../../assets/calendar.png')} style={{ marginBottom: 20 }}/>
              
          </Container>
        </ScrollView>
        <View style={{flexDirection: 'row', width:'100%', justifyContent: 'center',
          height: 85, borderTopWidth:'1', borderTopColor: 'lightgray'}}>
          <TouchableOpacity onPress={() => navigation.navigate('CourseMain')}>
            <Image source={require('../../assets/course.png')} style={{marginTop:18, marginRight:50}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => navigation.navigate('CourseMain')}>
            <Image source={require('../../assets/start.png')} style={{marginTop:10}}/>
          </TouchableOpacity>           
          <TouchableOpacity onPress={() => navigation.navigate('GroupList')}>
            <Image source={require('../../assets/group.png')} style={{marginTop:18, marginLeft:50}}/>
          </TouchableOpacity>
        </View>
      </Container>
    );
};

export default Home;