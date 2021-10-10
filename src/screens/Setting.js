import React from 'react';
import { SettingBar } from "../components";
import { View } from "react-native";

const _onPress = (setting) => {
  navigation.navigate("?", {
    date: log.logDate,
    day: log.dayOfWeek,
    hours: log.hours,
    minutes: log.minutes,
    carbon: log.carbon,
  });
};

const Setting = () => {
  return (
    <View style={{height: "100%", backgroundColor: "white"}}>
      <SettingBar setting={"알림 설정"} />
      <SettingBar setting={"프로필 이름 설정"} />
      <SettingBar setting={"비밀번호 수정"} />
      <SettingBar setting={"로그아웃"} />
      <SettingBar setting={"회원 탈퇴"} />
    </View>
  );
};

export default Setting;