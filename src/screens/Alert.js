import React from 'react';
import { AlertBar } from "../components";
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Alert = () => {
  return (
    <Container>
      <AlertBar alert={"이화 님이 내 글에 좋아요를 남겼습니다."} />
    </Container>
  );
};

export default Alert;