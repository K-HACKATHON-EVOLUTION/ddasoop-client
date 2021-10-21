import React, { useState, useContext } from 'react';
import { SettingBar, TreeName } from "../components";
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { UserContext } from '../contexts';
import axios from 'axios';

const _signOut = async (uid) => {
  try {
    await axios.delete(
      `http://13.125.127.125:8080/api/users/${uid}`);
  } catch (e) {
    console.log(e);
  }
};

const _nameChange = async (dispatch, user, uid, userName) => {
  const newUser = user;
  newUser.userName = userName;
  try {
    await axios.patch(
      `http://13.125.127.125:8080/api/users/${uid}/userName`
      , {"userName": userName}, { headers: { "Content-Type": "application/json" } });
      dispatch(newUser);
  } catch (e) {
    console.log(e);
  }
};

const Setting = ({ navigation }) => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [signoutModalVisible, setSignoutModalVisible] = useState(false);
  const { dispatch } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState(user?.userName);

  const logoutUser = {
    email: null,
    uid: null,
    userName: null,
    trees: null
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <SettingBar setting={"알림 설정"} />
      <SettingBar setting={"프로필 이름 설정"} onPress={() => { setProfileModalVisible(true); }} />
      <SettingBar setting={"비밀번호 수정"} onPress={() => { setPasswordModalVisible(true); }} />
      <SettingBar setting={"로그아웃"} onPress={() => { setLogoutModalVisible(true); }} />
      <SettingBar setting={"회원 탈퇴"} onPress={() => { setSignoutModalVisible(true); }} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>프로필 이름 설정</Text>
              <TreeName
                value={userName}
                onChangeText={(userName) => setUserName(userName)}
                placeholder={userName}
                onSubmitEditing={() => {}}
              ></TreeName>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                onPress={() => {
                  _nameChange(dispatch, user, user?.uid, userName);
                  setProfileModalVisible(!profileModalVisible);
                }}>
                <Text style={styles.textStyle}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setProfileModalVisible(!profileModalVisible);
                  setUserName(user?.userName);
                }}>
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={passwordModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>비밀번호 수정</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
              onPress={() => {
                setPasswordModalVisible(!passwordModalVisible);
              }}>
              <Text style={styles.textStyle}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>로그아웃 하시겠습니까?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                onPress={() => {
                  dispatch(logoutUser);
                }}>
                <Text style={styles.textStyle}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setLogoutModalVisible(!logoutModalVisible);
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
        visible={signoutModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>탈퇴 하시겠습니까?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#9CC27E' }}
                onPress={() => {
                  _signOut(user?.uid);
                  dispatch(logoutUser);
                }}>
                <Text style={styles.textStyle}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setSignoutModalVisible(!signoutModalVisible);
                }}>
                <Text style={styles.textStyle}>아니요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
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

export default Setting;