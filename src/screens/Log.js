import React from "react";
import styled from "styled-components/native";
import MapView, { Polyline } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const MapContainer = styled.View`
  background-color: black;
  padding: 20px;
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Log = ({ route }) => {
  return (
    <Container>
      <StyledText>{route.params.date}</StyledText>

      <MapContainer>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline
            coordinates={[
              { latitude: 37.8025259, longitude: -122.4351431 },
              { latitude: 37.7896386, longitude: -122.421646 },
              { latitude: 37.7665248, longitude: -122.4161628 },
              { latitude: 37.7734153, longitude: -122.4577787 },
              { latitude: 37.7948605, longitude: -122.4596065 },
              { latitude: 37.8025259, longitude: -122.4351431 },
            ]}
            strokeColor="green"
            strokeWidth={5}
          />
        </MapView>
      </MapContainer>
      <StyledText>{route.params.carbon}</StyledText>
      <StyledText>{route.params.day}</StyledText>
      <StyledText>{route.params.hours}</StyledText>
      <StyledText>{route.params.minutes}</StyledText>
    </Container>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  map: {
    width: width,
    height: 250,
  },
});

export default Log;
