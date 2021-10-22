import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components/native";
import MapView, { Polyline } from "react-native-maps";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { UserContext } from "../contexts";
import { Place, Textbox, AdBanner } from "../components";
import axios from "axios";
const width = Dimensions.get("window").width;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const MapContainer = styled.View`
  padding: 20px;
`;
const Log = ({ route }) => {
  var polyline = require("@mapbox/polyline");
  const { user } = useContext(UserContext);
  const [log, setLog] = useState({});
  const [path, setPath] = useState([]);
  const [initialLat, setInitialLat] = useState(37.56664867);
  const [initialLng, setInitialLng] = useState(126.9784088);
  const [latDelta, setLatDelta] = useState(0.0085);
  const [lngDelta, setLngDelta] = useState(0.0085);

  const getLog = async (userIdx, logIdx) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/users/${userIdx}/logs/${logIdx}`
      );
      await setLog(data);
      const decoded = await polyline.decode(data.route);
      let obj = {};
      let lat = [];
      let lng = [];
      for (let i = 0; i < decoded.length; i++) {
        obj = {};
        obj["latitude"] = decoded[i][0];
        lat.push(decoded[i][0]);
        obj["longitude"] = decoded[i][1];
        lng.push(decoded[i][1]);
        decoded[i] = obj;
      }
      await setPath(decoded);
      let maxLat = lat.reduce((prev, cur)=>{
        return prev > cur ? prev : cur;
      });
      let minLat = lat.reduce((prev, cur)=>{
        return prev > cur ? cur : prev;
      });
      let maxLng = lng.reduce((prev, cur)=>{
        return prev > cur ? prev : cur;
      });
      let minLng = lng.reduce((prev, cur)=>{
        return prev > cur ? cur : prev;
      });
      setInitialLat((maxLat+minLat)/2);
      setInitialLng((maxLng+minLng)/2);
      setLatDelta(maxLat-minLat+0.002);
      setLngDelta(maxLng-minLng+0.002);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLog(user?.uid, route.params.index);
  }, []);

  return (
    <Container>
      <View style={{width}}>
        <Text style={styles.title}>{route.params.date} {route.params.day}</Text>
      </View>
      <MapContainer>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: initialLat,
            longitude: initialLng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
          }}
          region={{
            latitude: initialLat,
            longitude: initialLng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
          }}
        >
          <Polyline
            coordinates={path}
            strokeColor="#9CC27E"
            strokeWidth={5}
          />
        </MapView>
      </MapContainer>
      <Place start={log.startLocation} stop={log.endLocation}></Place>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Textbox
          title={log.hours + "시간 " + log.minutes + "분"}
          subtitle={"시간"}
        />
        <Textbox title={log.distance + "km"} subtitle={"거리"} />
        <Textbox title={log.carbon + "kg"} subtitle={"탄소 저감"} />
      </View>
      <AdBanner/>
    </Container>
  );
};


const styles = StyleSheet.create({
  map: {
    width: width,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#848484",
    marginTop: 20,
    marginLeft: 20
  },
});

export default Log;
