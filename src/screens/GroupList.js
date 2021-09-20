import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import { MyGroup, SearchBar, Group } from "../components";
import axios from "axios";
// import https from "https";

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
  {
    forestIdx: 1,
    forestName: "test",
    leader: 1,
    size: 3,
    forestImg: null,
    deleteFlag: false,
  },
  {
    forestIdx: 2,
    forestName: "test2",
    leader: 1,
    size: 3,
    forestImg: null,
    deleteFlag: false,
  },
  {
    forestIdx: 3,
    forestName: "test3",
    leader: 1,
    size: 3,
    forestImg: null,
    deleteFlag: false,
  },
];

const GroupList = ({ navigation }) => {
  const [search, setSearch] = useState("");
  
  const _onPress = (group) => {
    navigation.navigate("Group", {
      name: group.forestName,
    });
  };

  return (
    <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
          <StyledText>MY 숲</StyledText>
          <MyGroup />
          <StyledText>숲 둘러보기</StyledText>
          <SearchBar
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="검색"
            returnKeyType="done"
          />
          {groups.map((group) => (
            <Group
              key={group.forestIdx}
              name={group.forestName}
              size={group.size}
              onPress={() => _onPress(group)}
            />
          ))}
        </Container>
      </ThemeProvider>
    </ScrollView>
  );
};

export default GroupList;
