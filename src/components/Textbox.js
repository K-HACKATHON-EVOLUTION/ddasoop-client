import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Textbox = ({title, subtitle}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        width: 120,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#848484",
    },
    subtitle: {
        fontSize: 13,
        color: "gray",
    },
});

export default Textbox;
