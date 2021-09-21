import React from "react";
import styled from "styled-components/native";
import { ScrollView, View } from "react-native";
import { Badge } from "../components";

const Wrapper = styled.View`
    display: flex;
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const BadgeList = ({ navigation }) => {
    return (
        <ScrollView>
            <Wrapper>
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
            </Wrapper>
        </ScrollView>
    );
};

export default BadgeList;
