import React, { useState, useEffect, useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import styled from "styled-components/native";
import axios from "axios";
import {VictoryChart, VictoryAxis, VictoryBar, VictoryLabel} from "victory-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: #848484;
`;

const Group = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#848484",
      headerRight: ({ tintColor }) => (
        <AntDesign
          name="setting"
          size={25}
          color={tintColor}
          style={{ marginRight: 20 }}
          onPress={()=>{navigation.navigate('GroupSetting')}}
        />
      ),
    });
  }, []);
  const [members, setMembers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const getMembers = async (forestIdx) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/forest/${forestIdx}/user`
      );
      setMembers(data.member);
      return;
    } catch (e) {
      console.log("getMembers error");
    }
  };

  const makeChart = () => {
    members.map((member) => (
      setChartData(chartData.concat({x:member.user_name, y: member.user_carbon}))
    ))
  }
  const data=[
    { x: "해린", y: 4},
    { x: "효정", y: 2},
    { x: "ㅇㅇ", y: 5},
  ];
  useEffect(() => {
    getMembers(route.params.index)
    makeChart();
  }, []);

  let i = 0;
  return (
    <Container>
      <StyledText>숲 이름: {route.params.name}</StyledText>

      <VictoryChart horizontal>
        <VictoryAxis style={{ 
          axis: {stroke: "transparent"}, 
          ticks: {stroke: "transparent"},
        }} />
        <VictoryBar
          barWidth={25}
          cornerRadius={12}
          labels={({ datum }) => datum.y}      
          labelComponent={<VictoryLabel dy={30}/>}
          style={{
            data: { fill: "#9CC27E" },
            labels: { fill: "black" }
          }}
          data={data}
          />
      </VictoryChart>
      <StyledText>Members: </StyledText>
      {members.map((member)=>(
        <StyledText key={i++}>{member.user_name}</StyledText>
      ))}
      <StyledText>숲 인덱스: {route.params.index}</StyledText>
      <StyledText>리더 인덱스: {route.params.leader}</StyledText>
      <StyledText>그룹 인원수: {route.params.size}</StyledText>
    </Container>
  );
};

export default Group;
