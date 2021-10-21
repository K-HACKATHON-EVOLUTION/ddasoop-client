import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Stairs } from "../components";
import { ScrollView, View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { UserContext } from "../contexts";
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLabel } from "victory-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #848484;
`;

const AboutText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #848484;
`;
const CarbonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #8caf71;
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
  const [trees, setTrees] = useState(0);
  const [treeImgs, setTreeImgs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [outModalVisible, setOutModalVisible] = useState(false);

  const getMembers = async (forestIdx, uid) => {
    const chart = [];
    const imgs = [];
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/forest/${forestIdx}/${uid}/user`
      );
      await setMembers(data.member);
      await setTrees(data.total_trees);
      await data.member.map((member) => (
        chart.push({ x: member.user_name, y: member.user_carbon }))
      )
      setChartData(chart);
      let i = data.member.length;
      let j = 0;
      while (i > 0) {
        imgs[j++] = data.member[i - 1].user_treeImg;
        i--;
      }
      setTreeImgs(imgs);

      if (data.own == 0) {
        navigation.setOptions({
          headerTintColor: "#848484",
          headerRight: ({ tintColor }) => (
            <AntDesign
              name="setting"
              size={25}
              color={tintColor}
              style={{ marginRight: 20 }}
              onPress={() => _onPress()}
            />
          )
        });
      } else if (data.own == 1) {
        navigation.setOptions({
          headerTintColor: "#848484",
          headerRight: ({ tintColor }) => (
            <AntDesign
              name="minuscircleo"
              size={25}
              color={tintColor}
              style={{ marginRight: 20 }}
              onPress={() => setOutModalVisible(true)}
            />
          )
        });
      } else {
        navigation.setOptions({
          headerTintColor: "#848484",
          headerRight: ({ tintColor }) => (
            <AntDesign
              name="pluscircleo"
              size={25}
              color={tintColor}
              style={{ marginRight: 20 }}
              onPress={() => setJoinModalVisible(true)}
            />
          )
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMembers(route.params.index, user?.uid);
  }, []);

  const _onPress = () => {
    navigation.navigate("GroupSetting", {
      index: route.params.index,
      leader: route.params.leader,
      name: route.params.name,
      size: route.params.size,
      img: route.params.img,
    });
  };

  return (
    <ScrollView>
      <Container>
        <StyledText>{route.params.name}</StyledText>
        <Stairs imgs={treeImgs} />
        <AboutText>지구를 살리자!</AboutText>
        <View style={{ flexDirection: 'row' }}>
          <AboutText>따릉이로 다같이 나무 </AboutText>
          <CarbonText>{trees}</CarbonText>
          <AboutText> 그루를 심었어요 🌲</AboutText>
        </View>
        <VictoryChart
          domainPadding={10}
          style={{ background: { fill: 'white' } }}>
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
            data={chartData}
          />
        </VictoryChart>
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
    </ScrollView>

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
