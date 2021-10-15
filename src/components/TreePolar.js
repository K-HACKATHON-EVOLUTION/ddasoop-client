import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";

const Outer = styled.View`
    height: 180px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    margin: 10px;
`;

const Inner = styled.View`
    height: 130px;
    width: 130px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const Date = styled.Text`
    font-size: 14px;
    color: black;
    margin-top: 10px;
`;

const TreePolar = ({ treeName, treeImg }) => {
    return (
        <Outer>
            <Inner>
                <Image style={styles.tree} source={{uri: treeImg}} />
            </Inner>
            <Date>{treeName}</Date>
        </Outer>
    );
    
};

const styles = StyleSheet.create({
    tree: {
        height: 80,
        width: 80,
        resizeMode: "contain"
    }
})

export default TreePolar;
