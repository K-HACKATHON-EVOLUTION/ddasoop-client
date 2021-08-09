import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const groups = [
    { _id: 1, name: 'EVOLUTION' },
    { _id: 2, name: '서대문구 숲' },
    { _id: 3, name: '강남구 숲' },
];

const GroupList = ({ navigation }) => {
    const _onPress = group => {
        navigation.navigate('Group', { id: group._id, name: group.name });
    };

    return (
        <Container>
            <StyledText>GroupList</StyledText>
            {groups.map(group => (
                <Button
                  key={group.id}
                  title={group.name}
                  onPress={() => _onPress(group)}
                />
            ))}
        </Container>
    );
};

export default GroupList;