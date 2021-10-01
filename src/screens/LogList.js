import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from "react-native";
import { Badge, Button, Record } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";


const NoRecord = styled.View`
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #e0e0e0;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
`;

const LogList = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [logs, setLogs] = useState([]);
    const [monthly, setMonthly] = useState({});
    const getLogs = async (uid) => {
        try {
        const { data } = await axios.get(
            `http://13.125.127.125:8080/api/users/${uid}/logs`
        );
        const logs = reform(data);
        setLogs(logs);
        } catch (e) {
        console.log("getLogs error");
        }
    };
    const getMonthly = async (uid) => {
        try {
        const { data } = await axios.get(
            `http://13.125.127.125:8080/api/users/${uid}/logs/monthly`
        );
        setMonthly(data);
        } catch (e) {
        console.log("getMonthly error");
        }
    };

    useEffect(() => {
        getLogs(user?.uid);
        getMonthly(user?.uid);
    }, [logs], [monthly]);

    const reform = (logs) => {
        let date = "";
        {
        logs.map((log) => {
            if (log.dayOfWeek === 1) log.dayOfWeek = "MON";
            else if (log.dayOfWeek === 2) log.dayOfWeek = "TUE";
            else if (log.dayOfWeek === 3) log.dayOfWeek = "WED";
            else if (log.dayOfWeek === 4) log.dayOfWeek = "THU";
            else if (log.dayOfWeek === 5) log.dayOfWeek = "FRI";
            else if (log.dayOfWeek === 6) log.dayOfWeek = "SAT";
            else log.dayOfWeek = "SUN";

            date = log.logDate.slice(2, 4) + "/";
            date += log.logDate.slice(5, 7) + "/";
            date += log.logDate.slice(8, 10);
            log.logDate = date;
        });
        }
        return logs;
    };

    const _onPress = (log) => {
        navigation.navigate("Log", {
        date: log.logDate,
        day: log.dayOfWeek,
        hours: log.hours,
        minutes: log.minutes,
        carbon: log.carbon,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>8월</Text>
                <Text style={styles.subtitle}>완주한 코스 {monthly.logCnt}개</Text>
                <Text style={styles.subtitle}>완성한 나무 {monthly.treeAmount}그루</Text>
            </View>
            <ScrollView>
                <View>
                    {logs.length != 0 ? (
                    logs.map((log) => (
                        <Record
                        key={log.logIdx}
                        date={log.logDate}
                        day={log.dayOfWeek}
                        hours={log.hours}
                        minutes={log.minutes}
                        carbon={log.carbon}
                        onPress={() => _onPress(log)}
                        />
                    ))
                    ) : (
                    <NoRecord>
                        <Text>기록 시작 버튼 연결되게 해야 함</Text>
                    </NoRecord>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    wrapper: {
        alignItems: "center",
        padding: 50,
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#848484",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: "gray",
    },
});

export default LogList;
