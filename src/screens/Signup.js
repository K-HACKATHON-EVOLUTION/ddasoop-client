import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { signup } from '../utils/firebase';
import { Alert } from 'react-native';

const Container = styled.View`
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 40px 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
    const [photoUrl, setPhotoUrl] = useState(images.photo);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const didMountRef = useRef();

    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = '';
            if (!name) {
                _errorMessage = '이름을 입력해 주세요.';
            } else if (!validateEmail(email)) {
                _errorMessage = '이메일 형식을 확인해 주세요.';
            } else if (password.length < 6) {
                _errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
            } else if (password !== passwordConfirm) {
                _errorMessage = '비밀번호가 다릅니다.';
            } else {
                _errorMessage = '';
            }
            setErrorMessage(_errorMessage);
        } else { 
            didMountRef.current = true;
        }
    }, [name, email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = async () => {
        try {
            const user = await signup({ email, password, name, photoUrl });
            console.log(user);
            Alert.alert('Signup Success', user.email);
        } catch (e) {
            Alert.alert('Signup Error', e.message);
        }
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image
                    rounded
                    url={photoUrl}
                    showButton
                    onChangeImage={url => setPhotoUrl(url)}
                />
                <Input
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    onSubmitEditing={() => {
                        setName(name.trim());
                        emailRef.current.focus();
                    }}
                    onBlur={() => setName(name.trim())}
                    placeholder="Name"
                    returnKeyType="next"
                />
                <Input
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(removeWhitespace(text))}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(removeWhitespace(text))}
                    onSubmitEditing={() => passwordConfirmRef.current.focus()}
                    placeholder="Password"
                    returnKeyType="next"
                    isPassword
                />
                <Input
                    ref={passwordConfirmRef}
                    label="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                    onSubmitEditing={_handleSignupButtonPress}
                    placeholder="Password Confirm"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="완료"
                    onPress={_handleSignupButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;