import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { MyGroup, SearchBar, Group, Image, Input, Button, SettingBar } from "../components";
import { UserContext } from "../contexts";
import { images } from "../utils/images";
import { View } from "react-native";

const Container = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 20px;
`;
const StyledText = styled.Text`
    font-weight: 500;
    font-size: 20px;
    margin-top: 10px;
`;

const GroupSetting = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const [photoUrl, setPhotoUrl] = useState(images.photo);


    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>

        <Container>
            <StyledText>숲 대표 사진</StyledText>
            <Image
                rounded
                url={photoUrl}
                showButton
                onChangeImage={(url) => setPhotoUrl(url)}
            />
            <StyledText>숲 이름</StyledText>
            <SearchBar
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="EVOLUTION"
                returnKeyType="done"
            />
            <StyledText>숲 한줄 소개</StyledText>
            <SearchBar
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="지구를 지키자!"
                returnKeyType="done"
            />
            
        </Container>
        <SettingBar setting={"그룹원 설정"} onPress={() => navigation.navigate('MemberSetting')} />
        <SettingBar setting={"숲 삭제하기"} />

        </KeyboardAwareScrollView>

    );
};

export default GroupSetting;
