import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components/native";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { UserContext } from "../contexts";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView from "react-native-maps";
import { Stopwatch } from 'react-native-stopwatch-timer';
import axios from "axios";

const width = Dimensions.get("window").width;
const polyline = require('@mapbox/polyline');

const MapContainer = styled.View`
    padding: 30px;
    background-color: white;
`;

const Start = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [start, setStart] = useState(false);
    const [reset, setReset] = useState(false);
    const [tracking, setTracking] = useState([]);
    const [currentLat, setCurrentLat] = useState(37.56664867095031);
    const [currentLng, setCurrentLng] = useState(126.97840889639532);
    const [startTime, setStartTime] = useState(new Date().toISOString().substr(0,19));

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status === 'granted') {
                let current = await Location.getCurrentPositionAsync();
                setCurrentLat(current.coords.latitude);
                setCurrentLng(current.coords.longitude);
            }
        })();
    }, []);

    let arr = [];

    const _onPressStart = async () => {
        setStart(true);
        setReset(false);
        setStartTime(new Date().toISOString().substr(0,19));
        await Location.startLocationUpdatesAsync('task', {
            accuracy: Location.Accuracy.Balanced,
        });
        TaskManager.defineTask('task', ({ data, error }) => {
            if (error) {
                return;
            }
            if (data) {
                const { locations } = data;
                const latitude = locations[0].coords.latitude;
                const longitude = locations[0].coords.longitude;
                arr.push([latitude, longitude]);
                setTracking(arr);
                setCurrentLat(latitude);
                setCurrentLng(longitude);
            }
        });
    }
    
    const _onPressStop = async() => {
        let endTime = new Date().toISOString().substr(0,19);
        await Location.stopLocationUpdatesAsync('task');
        await tracking.shift();
        const encoded = await polyline.encode(tracking);
        makeLog(user?.uid, encoded, startTime, endTime);
        setStart(false);
        setReset(false);
        navigation.navigate('LogList');
        setReset(true);
    }

    const makeLog = async (uid, encoded, startTime, stopTime) => {
        try {
        await axios.post(
            `http://13.125.127.125:8080/api/users/${uid}/logs`,
            {
                "startTime": startTime,
                "endTime" : stopTime,
                "startLocation": "증산교 앞",
                "endLocation": "월드컵경기장역 3번 출구",
                "route": encoded,
                "distance": 20
            });
        } catch (e) {
            console.log(e);
        }
    };

    const _onPressReset = async() => {
        arr = [];
        setTracking([]);
        await Location.stopLocationUpdatesAsync('task');
        setStart(false);
        setReset(true);
    }
    
    return (
        <View style={styles.container}>
            <MapContainer>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: currentLat,
                        longitude: currentLng,
                        latitudeDelta: 0.0085,
                        longitudeDelta: 0.0085,
                    }}
                    region={{
                        latitude: currentLat,
                        longitude: currentLng,
                        latitudeDelta: 0.0085,
                        longitudeDelta: 0.0085,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    userLocationUpdateInterval={1000}
                >
                </MapView>
            </MapContainer>
            <Stopwatch
                start={start}
                reset={reset}
                options={options}
            />
            {!start
            ?
            <TouchableOpacity onPress={_onPressStart}>
                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={_onPressStop}>
                <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={_onPressReset}>
                {!start ? null : <Text style={styles.subtext}>Reset</Text>}
            </TouchableOpacity>
        </View>
    );
};

const options = {
    container: {
        backgroundColor: '#9CC27E',
        borderRadius: 300,
        width: 300,
        height: 80,
        margin: 50,
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
        marginBottom: 30
    },
    subtext: {
        fontSize: 20,
        color: '#848484',
        marginBottom: 20
    },
    map: {
        width: width,
        height: 300,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#848484",
        marginTop: 20,
        marginLeft: 20
    },
});

export default Start;