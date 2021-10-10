import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components/native";
import MapView, { Polyline } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { UserContext } from "../contexts";
import { Place, Textbox } from "../components";
import axios from "axios";

const Container = styled.View`
    flex: 1;
    align-items: center;
    width: 100%;
`;
const Wrapper = styled.View`
    margin:20px;
    margin-right: 50px;
`;
const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
const Course = ({ route }) => {
    var polyline = require("@mapbox/polyline");
    const { user } = useContext(UserContext);
    const [log, setLog] = useState({});
    const [path, setPath] = useState([]);

    const getLog = async (userIdx, logIdx) => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/users/${userIdx}/logs/${logIdx}`
            );
            setLog(data);
        } catch (e) {
            console.log(e);
        }
    };

    const decode = async () => {
        const decoded = await polyline.decode(log.route);
        let obj = {};
        for (let i = 0; i < decoded.length; i++) {
            obj = {};
            obj["latitude"] = decoded[i][0];
            obj["longitude"] = decoded[i][1];
            decoded[i] = obj;
        }
        setPath(decoded);
    }

    useEffect(() => {
        getLog(user?.uid, route.params.index);
        decode();
    }, []);

    return (
        <Container>
            <RowWrapper>
            <Wrapper>
                <Text style={styles.title}>
                    {route.params.name}
                </Text>
                <Text style={styles.subtitle}>
                    {log.distance}km  |  {log.minutes}분  |  난이도 하
                </Text>
            </Wrapper>
            <AntDesign
                name="hearto"
                size={25}
                color={'gray'}
                style={{ }}
            />
            <AntDesign
                name="sharealt"
                size={25}
                color={'gray'}
                style={{ marginRight: 25 }}
            />
            </RowWrapper>
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78,
                        longitude: -122.4,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Polyline
                        coordinates={path}
                        strokeColor="green"
                        strokeWidth={5}
                    />
                </MapView>
            </View>
            <Place start={log.startLocation} stop={log.endLocation}></Place>
        </Container>
    );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    map: {
        width: width,
        height: 250,
        marginBottom: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000a10",
    },
    subtitle: {
        fontSize: 15
    }
});

export default Course;
