import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
