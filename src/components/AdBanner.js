import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Banner = styled.View`
    background-color: lightgray;
    height: 50px;
    width: 100%;
    margin: 10px;
    align-items: center;
    justify-content: center;
`

const AdBanner = () => {
    return (
        <Banner>
            <Text>
                광고
            </Text>
        </Banner>
    );
};


export default AdBanner;
