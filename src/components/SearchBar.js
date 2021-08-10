import React, { useState, forwardRef } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

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
  border: 1px solid ${({ theme, isFocused }) => (isFocused ? theme.focus : theme.inputBorder)};
  border-radius: 10px;
`;

const SearchBar = forwardRef(
    ({
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
    }, ref ) => {
        const [isFocused, setIsFocused] = useState(false);
        return (
            <Container>
                <StyledTextInput
                    ref={ref}
                    isFocused={isFocused}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    placeholder={placeholder}
                    secureTextEntry={isPassword}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="none" // iOS only
                    underlineColorAndroid="transparent" // Android only
                />
            </Container>
        );
    }
);

SearchBar.defaultProps = {
  onBlur: () => {},
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
};

export default SearchBar;