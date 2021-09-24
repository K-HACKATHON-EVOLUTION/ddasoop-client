import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from "axios";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Group = ({ route }) => {
  const [members, setMembers] = useState([]);
  const getMembers = async (forestIdx) => {
    try{
        const {data} = await axios.get(`http://13.125.127.125:8080/api/forest/${forestIdx}/user`);
        setMembers(data.member);
        return;
    }
    catch(e){
        console.log("getMembers error");
    }
  }

  useEffect(() => {
    getMembers(route.params.index);
  }, []);

  let i = 0;
  return (
    <Container>
      <StyledText>Members: </StyledText>
      {members.map((member) => (
            <StyledText key={i++}>{member.user_name}</StyledText>
          ))}
      <StyledText>Name: {route.params.name}</StyledText>
      <StyledText>Leader: {route.params.leader}</StyledText>
      <StyledText>size: {route.params.size}</StyledText>
    </Container>
  );
};

export default Group;