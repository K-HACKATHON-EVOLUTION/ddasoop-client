import React, { useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../contexts/User";
import { useNavigation } from '@react-navigation/native';

const Container = styled.ImageBackground`
  height: 120px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 10px;
`;

const MyGroup = ({ name, img, onPress }) => {
  const navigation = useNavigation(); 
  return (
    <View>
      {name ? (
        <TouchableOpacity onPress={() => onPress()}>
          <Container source={{ uri: `${img}`}}>
              <Text style={{ fontSize: 17 }}>{name}</Text>
          </Container>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("CreateGroup")}>
          <Container>
            <Text style={{ fontSize: 17 }}>숲 만들기</Text>
          </Container>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyGroup;
