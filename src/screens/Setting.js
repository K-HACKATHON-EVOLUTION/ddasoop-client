import React from 'react';
import styled from 'styled-components/native';
import { SettingBar } from "../components";
import { ScrollView, TouchableOpacity, Image, View, Text } from "react-native";

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
    <View>
      <SettingBar setting={"이름 변경"} />
      <SettingBar setting={"로그아웃"} />
      <SettingBar setting={"탈퇴"} />
    </View>
  );
};

export default Setting;