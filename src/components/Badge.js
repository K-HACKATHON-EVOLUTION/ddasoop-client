import React, { useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const Container = styled.View`
    align-self: center;
    margin-right: 10px;
    margin-left: 10px;

`;


const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Badge = ({ navigation }) => {
    return (
        <Container>
            <StyledImage />
        </Container>
    );
};

export default Badge;
