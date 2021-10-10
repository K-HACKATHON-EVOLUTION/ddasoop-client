import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";

import { MyGroup, SearchBar, Group, Image, Input, Button } from "../components";
import { UserContext } from "../contexts";
import { images } from "../utils/images";
import { View } from "react-native";

const Container = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 20px;
    height: ${Dimensions.get('window').height};
`;
const StyledText = styled.Text`
    font-weight: 500;
    font-size: 20px;
    margin-top: 10px;
`;

const CreateGroup = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [photoUrl, setPhotoUrl] = useState(images.photo);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(
            !(name && detail)
        );
    }, [name, detail]);

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
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="숲의 이름을 정해 주세요."
                returnKeyType="done"
            />
            <StyledText>숲 한줄 소개</StyledText>
            <SearchBar
                value={detail}
                onChangeText={(text) => setDetail(text)}
                placeholder="숲을 소개하는 한마디를 적어 주세요."
                returnKeyType="done"
            />
            <View style={{position: 'absolute', alignItems:"center", left: 20, right: 20, bottom: 140}} >
            <Button
            title="완료"
            disabled={disabled}
            />
            </View>

            </Container>
        </KeyboardAwareScrollView>

    );
};

export default CreateGroup;
