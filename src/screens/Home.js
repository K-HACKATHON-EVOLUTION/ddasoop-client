import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';

const Container = styled.View`
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Home = ({ navigation }) => {
    return (
        <Container>
            <StyledText>Home</StyledText>
            <Button
              title="go to group list"
              onPress={() => navigation.navigate('GroupList')}
            />
        </Container>
    );
};

export default Home;