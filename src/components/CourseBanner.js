import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const Container = styled.TouchableOpacity`
    background-color: gray;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 5px;
`;
const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: white;
`;

const CourseBanner = ({ name, onPress }) => {
    return (
        <Container
            onPress={onPress}
        >
            <Title>{name}</Title>
        </Container>
    );
};

export default CourseBanner;