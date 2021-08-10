import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, ScrollView } from 'react-native';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';
import { MyGroup, SearchBar, Group } from '../components';

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 20px;
`;

const StyledText = styled.Text`
  font-weight: 500;
  font-size: 20px;
`;

const groups = [
    { _id: 1, name: 'EVOLUTION' },
    { _id: 2, name: '서대문구 숲' },
    { _id: 3, name: '강남구 숲' },
];

const GroupList = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const _onPress = group => {
        navigation.navigate('Group', { id: group._id, name: group.name });
    };

    return (
      <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
            <StyledText>MY 숲</StyledText>
            <MyGroup>
            </MyGroup>
            <StyledText>숲 둘러보기</StyledText>
            <SearchBar
                value={search}
                onChangeText={text => setSearch(text)}
                placeholder="검색"
                returnKeyType="done"
            />
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>
            <Group/>

            {groups.map(group => (
                <Button
                  key={group.id}
                  title={group.name}
                  onPress={() => _onPress(group)}
                />
            ))}
        </Container>
      </ThemeProvider>
      </ScrollView>
    );
};

export default GroupList;