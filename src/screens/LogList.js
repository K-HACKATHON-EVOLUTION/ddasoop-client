import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Badge, Button, Record } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const currentMonth = new Date().getMonth() + 1;

const NoRecord = styled.View`
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #e0e0e0;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
`;

const LogList = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [monthlyLogs, setMonthlyLogs] = useState([]);
    const [monthlyDates, setMonthlyDates] = useState({});
    const [coloredDates, setColoredDates] = useState({});

    const getMonthlyLogs = async (uid, month) => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/users/${uid}/logLists?month=${month}`
            );
            setMonthlyLogs(reform(data));
        } catch (e) {
            console.log("getMonthlyLogs error");
        }
    };
    const getMonthlyDates = async (uid, month) => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/users/${uid}/logs?month=${month}`
            );
            coloring(data.logCnt, data.logDates);
            setMonthlyDates(data);
        } catch (e) {
            console.log(e);
        }
    };
    const _onMonthChange = async (month) => {
        getMonthlyLogs(user?.uid, month);
        getMonthlyDates(user?.uid, month);
    }

    useEffect(() => {
        getMonthlyLogs(user?.uid, currentMonth);
        getMonthlyDates(user?.uid, currentMonth);
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

    const coloring = (logCnt, logDates) => {
        let obj = {};
        let date = '';
        while (logCnt > 0) {
            date = logDates[--logCnt];
            obj[date] = {
                customStyles: {
                    container: {
                        backgroundColor: '#9CC27E'
                    },
                    text: {
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }
            }
        }
        setColoredDates(obj);
    }

    const _onPress = (log) => {
        navigation.navigate("Log", {
            index: log.logIdx,
            date: log.logDate,
            day: log.dayOfWeek,
        });
    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Calendar
                        style={{
                            height: 340, width: 280
                        }}
                        monthFormat={'yyyy MM'}
                        onMonthChange={(month) => { _onMonthChange(month.month) }}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        hideDayNames={true}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        markingType={'custom'}
                        markedDates={coloredDates}
                        theme={{
                            arrowColor: '#9CC27E',
                            todayTextColor: '#9CC27E',
                            monthTextColor: '#848484',
                            'stylesheet.calendar.header': {
                                monthText: {
                                    fontSize: 20,
                                },
                                week: {
                                    marginTop: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                },
                            },
                        }}
                    />
                    <Text style={styles.subtitle}>완주한 코스 {monthlyDates.logCnt}개</Text>
                    <Text style={styles.subtitle}>완성한 나무 {monthlyDates.treeAmount}그루</Text>
                </View>
                <View style={styles.wrapper}>
                    {monthlyLogs.length != 0 ? (
                        monthlyLogs.map((log) => (
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
                            <Text>기록이 없습니다!</Text>
                        </NoRecord>
                    )}
                </View>
            </View>
        </ScrollView>
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
