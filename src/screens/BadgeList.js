import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from "react-native";
import { Badge, AdBanner } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";

const BadgeList = () => {
    const { user } = useContext(UserContext);

    const [badges, setBadges] = useState([]);
    const getBadges = async (uid) => {
        try {
            const { data } = await axios.get(
                `http://13.125.127.125:8080/api/users/${uid}/badges`
            );
            setBadges(data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getBadges(user?.uid);
    }, []);

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.badge}>
                {badges.length != 0 ? (
                    badges.map((badge) => (
                        <Badge
                            key={badge.badgeImgIdx}
                            img={badge.filePath}
                        />
                    ))
                ) : (
                    <Text>뱃지 없음</Text>
                )}
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                <Badge />
                {/* <AdBanner/> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: 10
    },
});

export default BadgeList;
