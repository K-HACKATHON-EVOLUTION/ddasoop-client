import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet } from 'react-native';
import { CourseBanner, AdBanner, CourseMenu } from '../components';
import axios from 'axios';


const themes = [
    { _id: 0, name: '전체 코스 보기', diff: true },
    { _id: 1, name: '내가 저장한 코스', diff: true },
    { _id: 2, name: '한강 & 하천', diff: false },
    { _id: 3, name: '공원', diff: false },
    { _id: 4, name: '도심', diff: false },
    { _id: 5, name: '문화지', diff: false },
];

const CourseMain = ({ navigation }) => {
    const [courses, setCourses] = useState([]);

    const getTop3Courses = async () => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/course/top3`
            );
            setCourses(data.slice(0, 3));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTop3Courses();
    }, []);

    const _onPress = course => {
        navigation.navigate('CourseList', {
            name: course.name,
            select: course._id
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>🏆 월간 코스 랭킹 TOP 3 🏆</Text>
            {courses.map(course => (
                <CourseBanner
                    key={course.course_idx}
                    onPress={() => { }}
                    name={course.course_name}
                />
            ))}
            <Text style={styles.text2}>⛰ 테마별 코스 ⛰</Text>
            <View style={styles.menu}>
                {themes.map(theme => (
                    <CourseMenu
                        key={theme._id}
                        name={theme.name}
                        diff={theme.diff}
                        select={theme._id}
                        onPress={() => _onPress(theme)}
                    />
                ))}
            </View>
            {/* <AdBanner /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
        display: "flex",
        alignItems: "center",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text1: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text2: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 5,
    },
    menu: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
});

export default CourseMain;