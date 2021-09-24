import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, Image, View } from "react-native";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";
import { Badge, Record } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";

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

const Tree = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  const getLogs = async (uid) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/users/${uid}/logs`
      );
      const logs = reform(data);
      setLogs(logs);
    } catch (e) {
      console.log("getLogs error");
    }
  };

  useEffect(() => {
    getLogs(user?.uid);
  }, [logs]);

  const reform = (logs) => {
    let date = "";
    {
      logs.map((log) => {
        if (log.dayOfWeek === 1) log.dayOfWeek = "MON";
        else if (log.dayOfWeek === 2) log.dayOfWeek = "TUE";
        else if (log.dayOfWeek === 3) log.dayOfWeek = "WED";
        else if (log.dayOfWeek === 4) log.dayOfWeek = "THU";
        else if (log.dayOfWeek === 5) log.dayOfWeek = "FRI";
        else if (log.dayOfWeek === 6) log.dayOfWeek = "SAT";
        else log.dayOfWeek = "SUN";
        
        date = log.logDate.slice(2, 4) + "/";
        date += log.logDate.slice(5, 7) + "/";
        date += log.logDate.slice(8, 10);
        log.logDate = date;
      });
    }
    return logs;
  };

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
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/maintree.png")}
                style={{
                  resizeMode: "contain",
                  width: 120,
                  height: 120,
                }}
              />
            </View>
          </Wrapper>
          <Wrapper>
            <StyledText>획득한 뱃지</StyledText>
            <TouchableOpacity onPress={() => navigation.navigate("BadgeList")}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Badge />
                <Badge />
                <Badge />
              </View>
            </TouchableOpacity>
          </Wrapper>
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
