import React, { useContext, useState } from "react";
import { UserContext } from "../contexts";
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    Text,
    Button
} from "react-native";


const HomeTree = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const trees = user?.trees;
    const treesAmount = user?.trees.length;
    const treeImg = trees[treesAmount - 1].treeImg;
    const sumCarbon = (trees[treesAmount - 1].treeCarbon + ((treesAmount-1) * 10)).toFixed(3);

    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Tree")}
                    style={styles.touchable}
                >
                    <Image source={{ uri: treeImg }} style={styles.tree} />
                </TouchableOpacity>
                <View style={styles.column}>
                    <Text style={styles.title}>{sumCarbon}kg</Text>
                    <Text style={styles.subtitle}>총 탄소 저감량</Text>
                </View>
            </View>
            <View style={styles.bar} />
            <TouchableOpacity style={styles.button}>
                <Text
                    onPress={() => navigation.navigate("Start")}
                    style={styles.start}
                > START
                </Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    touchable: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        height: 150,
        width: 150,
    },
    tree: {
        backgroundColor: "#ffffff",
        resizeMode: "contain",
        width: 120,
        height: 120,
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems:"flex-start",
        height: 150
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#848484",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        color: "gray",
        marginBottom: 10
    },
    bar: {
        width: 270,
        height: 1,
        backgroundColor: "black",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#9CC27E",
        height: 50,
        width: 270,
        borderRadius: 100,
        alignItems: "center",
    },
    start: {
        fontSize: 25,
        color: "white",
        marginTop: 8
    }
});

export default HomeTree;
