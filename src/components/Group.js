import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

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
  width: 60px;
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
  color: ${({ theme }) => theme.headerTintColor};
`;

const Group = ({ name, img, size, carbon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Container>
        <RowWrapper>
        <StyledImage source={{ uri: `${img}`}} />
          <ColumnWrapper>
            <TitleText>{name}</TitleText>
            <SubText>멤버 수 {size}명</SubText>
          </ColumnWrapper>
        </RowWrapper>
        <SideText>{carbon}kg</SideText>
      </Container>
    </TouchableOpacity>
  );
};

Group.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Group;
