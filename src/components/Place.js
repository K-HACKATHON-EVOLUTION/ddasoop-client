import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";

const Container = styled.View`
    height: 80px;
    width: 370px;
    display: flex;
    align-items: flex-start;
    background-color: #e0e0e0;
    margin: 10px;
    padding-left: 30px;
`;

const Date = styled.Text`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Place = ({ start, stop }) => {
    return (
        <Container>
                <View>
                    <Date>{start}</Date>
                    <Date>|</Date>
                    <Date>{stop}</Date>
                </View>
        </Container>
    );
    
};

export default Place;
