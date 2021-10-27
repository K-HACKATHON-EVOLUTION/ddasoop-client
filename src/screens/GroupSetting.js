import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { MyGroup, SearchBar, Group, Image, Input, Button, SettingBar } from "../components";
import { UserContext } from "../contexts";
import { images } from "../utils/images";
import { TouchableOpacity, View, Modal, StyleSheet, Text } from "react-native";
import axios from 'axios';

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

const _delete = async (idx) => {
    try {
        await axios.delete(
            `http://13.125.127.125:8080/api/forests/${idx}`);
    } catch (e) {
        console.log(e);
    }
}

const GroupSetting = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState(images.photo);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    console.log(name);
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
                    placeholder={route.params.name}
                    returnKeyType="done"
                />
                <StyledText>숲 한줄 소개</StyledText>
                <SearchBar
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder={route.params.name}
                    returnKeyType="done"
                />
            </Container>
            <SettingBar setting={"그룹원 설정"} onPress={() => navigation.navigate('MemberSetting')} />
            <SettingBar setting={"숲 삭제하기"} onPress={() => setDeleteModalVisible(true)} />


            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>숲을 삭제하시겠습니까?</Text>
                        <Text style={styles.modalText}>모든 그룹원들이 탈퇴 처리됩니다.</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                                onPress={() => {
                                    _delete(route.params.index)
                                    // 뒤로가기 처리해야됨
                                }}>
                                <Text style={styles.textStyle}>네</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton }}
                                onPress={() => {
                                    setDeleteModalVisible(!deleteModalVisible);
                                }}>
                                <Text style={styles.textStyle}>아니요</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAwareScrollView>

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

export default GroupSetting;
