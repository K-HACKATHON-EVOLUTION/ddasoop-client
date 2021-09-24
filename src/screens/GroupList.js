import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import { MyGroup, SearchBar, Group } from "../components";
import { UserContext } from '../contexts';
import axios from "axios";

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

const GroupList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [groups, setGroup] = useState([]);
  const [mygroup, setMygroup] = useState({});

  const getGroups = async () => {
    try{
        const {data} = await axios.get(`http://13.125.127.125:8080/api/forests`);
        setGroup(data);
        return;
    }
    catch(e){
        console.log("getGroup error");
    }
  }

  const getMygroup = async (uid) => {
    try{
        const {data} = await axios.get(`http://13.125.127.125:8080/api/users/${uid}/forest`);
        setMygroup(data);
        return;
    }
    catch(e){
        console.log("getMygroup error");
    }
  }

  useEffect(() => {
    getMygroup(user?.uid);
    getGroups();
  }, [groups]);

  const _onPress = (group) => {
    navigation.navigate("Group", {
      index: group.forestIdx,
      leader: group.leader,
      name: group.forestName,
      size: group.size,
      img: group.forestImg
    });
  };

  return (
    <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
          <StyledText>MY 숲</StyledText>
          <MyGroup name={mygroup.forestName} img={mygroup.forestImg}/>
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
