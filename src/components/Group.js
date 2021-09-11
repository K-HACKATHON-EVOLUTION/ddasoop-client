import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { theme } from "../theme";

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const ColumnWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;
const RowWrapper = styled.View`
  flex-direction: row;
`;
const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.headerTintColor};
  width: 60;
  height: 60px;
  border-radius: 100px;
`;
const TitleText = styled.Text`
  font-size: 17px;
  margin-bottom: 5px;
`;
const SubText = styled.Text`
  font-size: 12px;
  color: gray;
`;
const SideText = styled.Text`
  font-size: 17px;
  color: #8caf71;
`;

const Group = ({ _id, name, size, onPress, navigation }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Container>
        <RowWrapper>
          {/* <StyledImage source={require('../../assets/maintree.png')}></StyledImage> */}
          <StyledImage></StyledImage>
          <ColumnWrapper>
            <TitleText>{name}</TitleText>
            <SubText>멤버 수 {size}명</SubText>
          </ColumnWrapper>
        </RowWrapper>
        <SideText>1028kg</SideText>
      </Container>
    </TouchableOpacity>
  );
};

export default Group;
