import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  color: gray;
`;

const Alert = () => {
  return (
    <Container>
      <StyledText>알림이 없습니다!</StyledText>
    </Container>
  );
};

export default Alert;