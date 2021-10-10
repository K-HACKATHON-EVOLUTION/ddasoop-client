import React from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";

const Container = styled.View`
    height: 60px;
    width: 370px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    margin-left: 40px;
    margin-bottom: 30px;
`;

const Date = styled.Text`
    font-size: 15px;
    margin-bottom: 20px;
    margin-left: 10px;
`;

const Place = ({ start, stop }) => {
    return (
        <Container>
                <Image source={require("../../assets/arrow.png")}></Image>
                <View>
                    <Date>{start}</Date>
                    <Date>{stop}</Date>
                </View>
        </Container>
    );
    
};

export default Place;
