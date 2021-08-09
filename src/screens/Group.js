import React from 'react';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Group = ({ route }) => {
    return (
        <Container>
            <StyledText>Group</StyledText>
            <StyledText>ID: {route.params.id}</StyledText>
            <StyledText>Name: {route.params.name}</StyledText>

        </Container>
    );
};

export default Group;