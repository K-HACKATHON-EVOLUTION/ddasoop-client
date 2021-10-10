import React, { useContext } from "react";
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

    return (
        <View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Tree")}
                    style={styles.touchable}
                >
                    <Image source={{ uri: user?.treeImg }} style={styles.tree} />
                </TouchableOpacity>
                <View style={styles.column}>
                    <Text>나무 이름</Text>
                    <Text style={styles.title}>20.23kg</Text>
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
        height: 150
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginRight: 30
    },
    subtitle: {
        fontSize: 13,
        color: "lightgray",
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
