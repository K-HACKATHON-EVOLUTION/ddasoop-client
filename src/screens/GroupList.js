import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import { MyGroup, SearchBar, Group } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from "expo-location";
import { setTestDeviceIDAsync } from "expo-ads-admob";


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
  const [groups, setGroup] = useState([]);
  const [mygroup, setMygroup] = useState({});

  const getGroups = async () => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/forests`
      );
      setGroup(data);
    } catch (e) {
      console.log("getGroup error");
    }
  };

  const getMygroup = async (uid) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/users/${uid}/forest`
      );
      setMygroup(data);
    } catch (e) {
      if (e.response && e.response.status != 500) console.log('getMyGroup Error');
    }
  };

  const _searchGroup = async (search) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/forest/search?forest_name=${search}`
      );
      setGroup(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMygroup(user?.uid);
    getGroups();
  }, []);

  const setNewGroup = (group) => {
    setMygroup(group);
  }

  const _onPress = (group, setNewGroup) => {
    navigation.navigate("Group", {
      index: group.forestIdx,
      leader: group.leader,
      name: group.forestName,
      size: group.size,
      img: group.forestImg,
      carbon: group.carbon,
      setNewGroup: setNewGroup
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <ThemeProvider theme={theme}>
        <Container>
          <StyledText>MY 숲</StyledText>
          <MyGroup
            name={mygroup.forestName}
            img={mygroup.forestImg}
            onPress={() => _onPress(mygroup)}
          />
          <StyledText>숲 둘러보기</StyledText>
          <SearchBar
            onChangeText={(text) => _searchGroup(text)}
            onSubmitEditing={(text) => _searchGroup(text)}
            returnKeyType="done"
          />
          {groups.length !== 0 ?
            (groups.map((group) => (
              <Group
                key={group.forestIdx}
                name={group.forestName}
                img={group.forestImg}
                size={group.size}
                carbon={group.carbon.toFixed(2)}
                onPress={() => _onPress(group, setNewGroup)}
              />
            ))) :
            <Text>그룹이 없습니다</Text>}
        </Container>
      </ThemeProvider>
    </ScrollView>
  );
};

export default GroupList;
