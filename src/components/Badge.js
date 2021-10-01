import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
    margin: 7px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Badge = ({ navigation, img }) => {
    return (
        <Container>
            <StyledImage source={{ uri: `${img}`}}/>
        </Container>
    );
};

export default Badge;
