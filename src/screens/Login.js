import React, { useContext, useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Input, Button } from '../components';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { login } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
import axios from "axios";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top }}) => top}px;
    padding-bottom: ${({ insets: { bottom }}) => bottom}px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const passwordRef = useRef();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const getUser = async (uid) => {
        try{
            const {data: user} = await axios.get(`http://13.125.127.125:8080/api/users/${uid}/main`);
            return user.totalCarbon;
        }
        catch(e){
            console.log("getUser error");
        }
    }

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : '이메일 형식을 확인해 주세요.'
        );
    };
    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };
    const _handleLoginButtonPress = async () => {
        try {
            spinner.start();
            const user = await login({ email, password });
            user.totalCarbon = await getUser(user.uid);
            dispatch(user);
        } catch (e) {
            Alert.alert('Login Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={30}
        >
            <Container insets={insets}>
                <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="로그인"
                    onPress={_handleLoginButtonPress}
                    disabled={disabled}
                />
                <Button
                    title="회원가입"
                    onPress={()=>navigation.navigate('Signup')}
                    isFilled={false}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;