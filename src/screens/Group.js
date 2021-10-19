import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Stairs } from "../components";
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { UserContext } from "../contexts";

import { VictoryChart, VictoryAxis, VictoryBar, VictoryLabel } from "victory-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: #848484;
`;

const _out = async (forest, uid) => {
  try {
    await axios.delete(
      `http://13.125.127.125:8080/api/forests/${forest}/users/${uid}`);
  } catch (e) {
    console.log(e);
  }
};

const _join = async (forest, uid) => {
  try {
    await axios.patch(
      `http://13.125.127.125:8080/api/users/${uid}/forest/${forest}`);
  } catch (e) {
    console.log(e);
  }
};

const Group = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [outModalVisible, setOutModalVisible] = useState(false);

  const data = [
    { x: "민주", y: 0.0 },
    { x: "효정", y: 5.00 },
    { x: "현아", y: 10.00 },
    { x: "해린", y: 28.41 },
  ];

  const options = (name, onPress) => {
    return {
      headerTintColor: "#848484",
      headerRight: ({ tintColor }) => (
        <AntDesign
          name={name}
          size={25}
          color={tintColor}
          style={{ marginRight: 20 }}
          onPress={onPress}
        />
      ),
    }
  }

  const getMembers = async (forestIdx, uid) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/forest/${forestIdx}/${uid}/user`
      );
      await setMembers(data.member);
      if (data.own == 0) {
        navigation.setOptions(
          options(
            "setting",
            () => { navigation.navigate('GroupSetting') }
          )
        );
      } else if (data.own == 1) {
        navigation.setOptions(
          options(
            "minuscircleo",
            () => { setOutModalVisible(true) }
          )
        );
      } else {
        navigation.setOptions(
          options(
            "pluscircleo",
            () => { setJoinModalVisible(true) }
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makeChart = () => {
    members.map((member) => (
      setChartData(chartData.concat({ x: member.user_name, y: member.user_carbon }))
    ))
  }
  

  useEffect(() => {
    getMembers(route.params.index, user?.uid);
    makeChart();
  }, []);
  let i = 0;
  return (
    <Container>
      <StyledText>{route.params.name}</StyledText>

      <Stairs></Stairs>

      <VictoryChart
        domainPadding={10}
        style={{ background: { fill: 'pink' } }}>
        <VictoryAxis style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
        }} />
        <VictoryBar horizontal
          barWidth={20}
          cornerRadius={10}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={0} />}
          style={{
            data: { fill: "#9CC27E" },
            labels: { fill: "black" },
          }}
          categories={{
            x: ["민주", "효정", "현아", "해린"]
          }}
          data={data}
        />
      </VictoryChart>

      <StyledText>Members: </StyledText>
      {members.map((member) => (
        <StyledText key={i++}>{member.user_name}</StyledText>
      ))}
      <StyledText>숲 인덱스: {route.params.index}</StyledText>
      <StyledText>리더 인덱스: {route.params.leader}</StyledText>
      <StyledText>그룹 인원수: {route.params.size}</StyledText>

      <Modal
        animationType="fade"
        transparent={true}
        visible={joinModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>이 숲에 가입하시겠습니까?</Text>
            <Text style={styles.modalText}>이전에 가입되어 있던 숲에서는 탈퇴합니다.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                onPress={() => {
                  _join(route.params.index, user?.uid);
                  setJoinModalVisible(!joinModalVisible);
                  route.params.setNewGroup({
                    "forestIdx": route.params.index,
                    "leader": route.params.leader,
                    "forestName": route.params.name,
                    "sizre": route.params.size,
                    "forestImg": route.params.img,
                    "deleteFlag": false,
                    "carbon": route.params.carbon
                });
                  navigation.goBack();
                }}>
                <Text style={styles.textStyle}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setJoinModalVisible(!joinModalVisible);
                }}>
                <Text style={styles.textStyle}>아니요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={outModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>숲에서 탈퇴 하시겠습니까?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                onPress={() => {
                  _out(route.params.index, user?.uid);
                  route.params.setNewGroup({});
                  setOutModalVisible(!outModalVisible);
                  navigation.goBack();
                }}>
                <Text style={styles.textStyle}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setOutModalVisible(!outModalVisible);
                }}>
                <Text style={styles.textStyle}>아니요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



    </Container>



  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width: 100,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Group;
