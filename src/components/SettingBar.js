import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";

const Container = styled.View`
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-color: lightgray;
    border-bottom-width: 0.2px;
    padding: 20px;
`;
const StyledText = styled.Text`
    font-size: 20px;
    color: gray;
`;

const SettingBar = ({ setting, onPress }) => {
    return (
        <TouchableOpacity style={{width:"100%"}} onPress={() => onPress()}>
        <Container>
            <StyledText>{setting}</StyledText>
            <AntDesign name="right" color="gray" size={25}/>
        </Container>
        </TouchableOpacity>
    );
    
};

export default SettingBar;
