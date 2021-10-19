import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.background};
  padding: 12px 12px;
  font-size: 15px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.focus : theme.inputBorder)};
  border-radius: 10px;
`;

const SearchBar = ({
  onChangeText,
  onSubmitEditing,
  returnKeyType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      <StyledTextInput
        isFocused={isFocused}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="검색할 숲의 이름을 입력해 주세요"
        returnKeyType={returnKeyType}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none" // iOS only
        underlineColorAndroid="transparent" // Android only
      />
    </Container>
  );
};

export default SearchBar;
