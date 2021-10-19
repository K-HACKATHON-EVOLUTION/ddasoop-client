import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    Button
} from "react-native";

const Stairs = ({}) => {
    return (
        <View style={styles.container}>
            <View style={styles.first}></View>
            <View style={styles.first, styles.second}></View>
            <View style={styles.first, styles.third}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: 100,
        height: 50,
        flexDirection: 'row'
    },
    first: {
        height: 30,
        width: 10,
        backgroundColor: 'green'
    },
    second: {
        height: 20,
        backgroundColor: 'red',
    },
    third: {
        height: 10,
        backgroundColor: 'blue'
    }
});

export default Stairs;
