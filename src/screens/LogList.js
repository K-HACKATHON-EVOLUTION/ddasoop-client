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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
            setLogs(reform(data));
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
    }, []);

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
            index: log.logIdx,
            date: log.logDate,
            day: log.dayOfWeek,
        });
    };

    return (
        <ScrollView>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                    <Calendar
                        style={{
                            height: 340, width: 280
                        }}
                        current={'2021-10-10'}
                        monthFormat={'yyyy MM'}
                        onMonthChange={(month) => { console.log('month changed', month) }}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        hideDayNames={true}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        markingType={'period'}
                        markedDates={{
                            '2021-10-10': { disabled: true, startingDay: true, color: '#9CC27E', endingDay: true },
                            '2021-10-11': { disabled: true, startingDay: true, color: '#9CC27E', endingDay: true }
                        }}
                        theme={{
                            arrowColor: '#9CC27E',
                            'stylesheet.calendar.header': {
                                monthText: {
                                    fontSize: 20,
                                },
                                week: {
                                    marginTop: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                },
                            }
                        }}
                    />
                    <Text style={styles.subtitle}>완주한 코스 {monthly.logCnt}개</Text>
                    <Text style={styles.subtitle}>완성한 나무 {monthly.treeAmount}그루</Text>
                </View>
                <View style={styles.wrapper}>
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
                </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    wrapper: {
        alignItems: "center",
        padding: 20        
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
