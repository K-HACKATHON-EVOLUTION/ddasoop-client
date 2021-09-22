import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { ScrollView,TouchableOpacity, Image, View } from "react-native";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import { Badge, Record } from "../components";
import { UserContext } from "../contexts";

const Container = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 30px;
`;

const Wrapper = styled.View`
  flex-direction: column;
  margin-bottom: 30px;
`;

const StyledText = styled.Text`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

const logs = [
  {
    logIdx: 1,
    logDate: "2021-08-08",
    dayOfWeek: 4,
    hours: 1,
    minutes: 3,
    carbon: 1.32
  },
  {
    logIdx: 2,
    logDate: "2021-08-08",
    dayOfWeek: 4,
    hours: 1,
    minutes: 3,
    carbon: 1.36
  },
];


const Tree = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const _onPress = (log) => {
    navigation.navigate("Log", {
      date: log.logDate,
      day: log.dayOfWeek,
      hours: log.hours,
      minutes: log.minutes,
      carbon: log.carbon,
    });
  };

  return (
    <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
          <Wrapper>
            <StyledText>{user?.displayName}님의 나무</StyledText>
            <View style={{alignItems: 'center'}} >
              <Image
                source={require('../../assets/maintree.png')}
                style={{
                  resizeMode: "contain",
                  width: 120,
                  height: 120
                }}
              />
            </View>
          </Wrapper>
          <TouchableOpacity onPress={() => navigation.navigate('BadgeList')}>
            <Wrapper>
              <StyledText>획득한 뱃지</StyledText>
              <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Badge/>
                <Badge/>
                <Badge/>
              </View>
            </Wrapper>
          </TouchableOpacity>
          <Wrapper>
            <StyledText>기록</StyledText>
            {logs.map((log) => (
            <Record
              key={log.logIdx}
              date={log.logDate}
              day={log.dayOfWeek}
              hours={log.hours}
              minutes={log.minutes}
              carbon={log.carbon}
              onPress={() => _onPress(log)}
            />
          ))}
          </Wrapper>
        </Container>
      </ThemeProvider>
    </ScrollView>
  );
};

export default Tree;