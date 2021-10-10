import React from "react";
import { Member } from "../components"
import { ScrollView } from "react-native";

const MemberSetting = () => {
    return (
        <ScrollView style={{height: "100%", backgroundColor: "white"}}>
            <Member name={"해린"}></Member>
            <Member name={"현아"}></Member>
            <Member name={"효정"}></Member>
            <Member name={"민주"}></Member>
        </ScrollView>
    );
};

export default MemberSetting