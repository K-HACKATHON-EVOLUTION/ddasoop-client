import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 48%;
    margin: 1%;
    background-color: ${({ diff }) =>
        diff ? '#8CAF71' : '#aad48a'};
`;
const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: white;
    font-weight: bold;
`;

const CourseMenu = ({ diff, name, onPress }) => {
    return (
        <Container
            onPress={onPress}
            diff={diff}
        >
            <Title>{name}</Title>
        </Container>
    );
};

export default CourseMenu;