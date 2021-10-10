import React from "react";
import styled from 'styled-components/native';

import {
    StyleSheet,
    View,
    Text,
} from "react-native";

const Container = styled.TouchableOpacity`
    background-color: gray;
    height: 150px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 48%;
    margin: 2%;
`;

const Shortcut = ({ onPress, title }) => {
    return (
        <Container>
            <Text>{title}</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "lightgray",
        height: 150,
        width: 150,
        margin: 10
    }
});

export default Shortcut;
