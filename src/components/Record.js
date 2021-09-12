import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

const Container = styled.View`
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #e0e0e0;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
`;

const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: black;
`;
const Log = styled.Text`
    font-size: 13px;
    color: gray;
`;

const Record = ({ date, day, hours, minutes, carbon, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
        <Container>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{ alignItems: 'center'}}>
                    <Date>FRI</Date>
                    <Date>9/23</Date>
                </View>
                <View style={{marginLeft: '15%'}}>
                    <Log>{hours}시 {minutes}분</Log>
                    <Log>{carbon}kg</Log>
                </View>
            </View>
            <AntDesign name="right" size={25} />
        </Container>
        </TouchableOpacity>
    );
    
};

export default Record;
