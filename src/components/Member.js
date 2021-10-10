import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";

const RowWrapper = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
`;
const StyledImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 100px;
`;
const NameText = styled.Text`
    font-size: 17px;
`;
const Text = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: white;
`;
const Button = styled.TouchableOpacity`
    background-color: #9CC27E;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    width: 60px;
    height: 40px;
    margin-left: 170px;
`;

const Member = ({ name, url }) => {
    return (
        <RowWrapper>
            <StyledImage source={require('../../assets/badge.png')}/>
            <NameText>{name}</NameText>
            <Button>
                <Text>삭제</Text>
            </Button>
        </RowWrapper>
    );
};

export default Member;
