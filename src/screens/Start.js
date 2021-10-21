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
import * as TaskManager from 'expo-task-manager';

const Start = () => {
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                await Location.startLocationUpdatesAsync('task', {
                    accuracy: Location.Accuracy.Balanced,
                });
                TaskManager.defineTask('task', ({ data, error }) => {
                    console.log(data);
                    if (error) {
                        setErrorMsg(error);
                        return;
                    }
                    if (data) {
                        const { locations } = data;
                        setLocation(locations);
                    }
                });
            }
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
            <TouchableOpacity onPress={toggleStopwatch}>
                <Text style={styles.text}>{!start ? "Start" : "Stop"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetStopwatch}>
                <Text style={styles.subtext}>{!start ? "  " : "Reset"}</Text>
            </TouchableOpacity>
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
        marginBottom: 20
    },
    subtext: {
        fontSize: 20,
        color: '#848484',
        marginBottom: 20
    }
});
export default Start;