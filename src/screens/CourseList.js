import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from "react-native";
import { CourseBanner } from "../components";
import { UserContext } from "../contexts";

const CourseList = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/courses`
            );
            setCourses(data.slice(0, 3));
        } catch (e) {
            console.log(e);
        }
    }; const _onPress = (course) => {
        navigation.navigate("Course", {
            id: course.id,
            name: course.name,
            index: 1
        });
    };

    return (
        <View style={styles.container}>
            {route.params.courseList.map((course) => (
                <CourseBanner
                    key={course.id}
                    name={course.name}
                    select={course.select}
                    onPress={() => _onPress(course)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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

export default CourseList;
