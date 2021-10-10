import React from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet } from 'react-native';
import { CourseBanner, AdBanner, CourseMenu } from '../components';

const courses = [
    { _id: 1, name: '전체 코스 보기', diff: true, courseList: [{"id": 1, "name": "불광천 코스"}, {"id": 2, "name": "홍제천 코스"}]},
    { _id: 2, name: '내가 저장한 코스', diff: true, courseList: [{"id": 1, "name": "dd"}]},
    { _id: 3, name: '한강 & 하천', diff: false, courseList: [{"id": 1, "name": "dd"}]},
    { _id: 4, name: '공원', diff: false, courseList: [{"id": 1, "name": "dd"}]},
    { _id: 5, name: '도심', diff: false, courseList: [{"id": 1, "name": "dd"}]},
    { _id: 6, name: '문화지', diff: false, courseList: [{"id": 1, "name": "dd"}]},
];

const CourseMain = ({ navigation }) => {
    const _onPress = course => {
        navigation.navigate('CourseList', {
            id: course._id,
            name: course.name,
            diff: course.diff,
            courseList: course.courseList
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>🏆 월간 코스 랭킹 TOP 3 🏆</Text>
            <CourseBanner onPress={() => { }} name={"강바람 맞으며 달리는 한강 라이딩 코스"} />
            <CourseBanner onPress={() => { }} name={"도심 속 궁궐 일대를 돌아보는 고궁 라이딩 코스"} />
            <CourseBanner onPress={() => { }} name={"데이트하기 좋은 경춘선숲길 라이딩 코스"} />
            <Text style={styles.text2}>⛰ 테마별 코스 ⛰</Text>
            <View style={styles.menu}>
                {courses.map(course => (
                <CourseMenu
                    key={course._id}
                    name={course.name}
                    diff={course.diff}
                    courseList={course.courseList}
                    onPress={() => _onPress(course)}
                />
            ))}
            </View>
            <AdBanner />
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