import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Platform
} from "react-native";
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AdBanner } from "../components";
import * as Location from 'expo-location';

const Start = () => {
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    toggleStopwatch = () => {
        setStart(!start);
        setReset(false);
    }
    resetStopwatch = () => {
        setStart(false);
        setReset(true);
    }
    return (
        <View style={styles.container}>
            <Stopwatch
                start={start}
                reset={reset}
                options={options}
            />
            <Text>{text}</Text>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={toggleStopwatch}>
                    <Text style={styles.text}>{!start ? "Start" : "Stop"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetStopwatch}>
                    <Text style={styles.text}>Reset</Text>
                </TouchableOpacity>
            </View>
            <AdBanner />
        </View>
    );
};

const options = {
    container: {
        backgroundColor: '#9CC27E',
        borderRadius: 300,
        width: 300,
        height: 300,
        margin: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 40,
        color: '#FFF',
    }
};
const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 30,
        color: '#9CC27E',
        margin: 50,
    }
});
export default Start;