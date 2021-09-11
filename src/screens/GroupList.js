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
    forestName: "EVOLUTION",
    leader: 1,
    size: 3,
    forestImg: null,
    deleteFlag: false,
  },
  {
    forestIdx: 2,
    forestName: "d",
    leader: 1,
    size: 5,
    forestImg: null,
    deleteFlag: false,
  },
  {
    forestIdx: 3,
    forestName: "f",
    leader: 1,
    size: 10,
    forestImg: null,
    deleteFlag: false,
  },
];

const GroupList = ({ navigation }) => {
  const [search, setSearch] = useState("");
  // const [groups, setGroups] = useState([]);

  // getGroups = async () => {
  //   try{
  //     const {data: groups} = await axios.get("", {httpsAgent: agent});
  //     setGroups(groups);
  //   }
  //   catch(e){
  //     console.log("getGroups error");
  //   }
  // }

  const _onPress = (group) => {
    navigation.navigate("Group", {
      id: group.forestIdx,
      name: group.forestName,
    });
  };

  return (
    <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
          <StyledText>MY 숲</StyledText>
          <MyGroup></MyGroup>
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
