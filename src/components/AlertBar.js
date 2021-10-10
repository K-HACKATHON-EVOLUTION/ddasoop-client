import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const Container = styled.View`
    height: 70px;
    width: 100%;
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

const AlertBar = ({ alert }) => {
    return (
        <Container>
            <StyledText>{alert}</StyledText>
        </Container>
    );
};

export default AlertBar;
