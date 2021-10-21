import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    Button
} from "react-native";
import styled from "styled-components/native";


const StyledImage = styled.Image`
    width: 65px;
    height: 80px;
    ;
`;
const Stairs = ({ imgs }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {imgs[1]
                    ? <StyledImage source={{ uri: `${imgs[1]}` }} />
                    : null
                }
                <View style={styles.second}></View>
            </View>
            <View style={styles.wrapper}>
                {imgs[0]
                    ? <StyledImage source={{ uri: `${imgs[0]}` }} />
                    : null
                }
                <View style={styles.first}></View>
            </View>
            <View style={styles.wrapper}>
                {imgs[2]
                    ? <StyledImage source={{ uri: `${imgs[2]}` }} />
                    : null
                }      
                <View style={styles.third}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 230,
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 30
    },
    wrapper: {
        alignItems: 'center'
    },
    first: {
        height: 80,
        width: 100,
        backgroundColor: '#8caf71'
    },
    second: {
        height: 50,
        width: 100,
        backgroundColor: '#9cc27e',
    },
    third: {
        height: 30,
        width: 100,
        backgroundColor: '#c4f065'
    }
});

export default Stairs;
