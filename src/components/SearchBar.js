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
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  returnKeyType,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Container>
      <StyledTextInput
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none" // iOS only
        underlineColorAndroid="transparent" // Android only
      />
    </Container>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.oneOf(["done", "next"]),
  maxLength: PropTypes.number,
};

export default SearchBar;
