import React, { useState, useRef, useContext } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { AntDesign, Feather } from "@expo/vector-icons";
import { UserContext } from "../contexts";
import axios from "axios";

const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const StyledTextInput = styled.TextInput`
    color: ${({ isFocused }) => (isFocused ? 'black' : '#848484')};
    font-size: 15px;
    border: none;
`;

const editName = async (uid, name) => {
    try {
        await axios.patch(
        `http://13.125.127.125:8080/api/users/${uid}/trees/current/treeName`
        , name, {headers: {"Content-Type": "text/plain"}});
    } catch (e) {
        console.log(e);
    }
};

const TreeName = ({
    value,
    onChangeText,
    placeholder,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const { user } = useContext(UserContext);
    const ref = useRef();

    return (
        <Container>
            <StyledTextInput
                ref={ref}
                isFocused={isFocused}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={() => editName(user?.uid, value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                returnKeyType="done"
                maxLength={10}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none" // iOS only
                underlineColorAndroid="transparent" // Android only
            />
            <Feather
                name="edit-3"
                size={14}
                color="#848484"
                style={{ marginLeft: 5 }}
                onPress={()=>(ref.current.focus())}
            />
        </Container>
    );
};

TreeName.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf(["done", "next"]),
};

export default TreeName;
