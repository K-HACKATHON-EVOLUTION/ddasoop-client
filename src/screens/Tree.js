import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { Badge } from "../components";
import { UserContext } from "../contexts";
import axios from "axios";

const Tree = () => {
  const { user } = useContext(UserContext);
  const [badges, setBadges] = useState([]);
  const getBadges = async (uid) => {
    try {
      const { data } = await axios.get(
        `http://13.125.127.125:8080/api/users/${uid}/badges`
      );
      setBadges(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBadges(user?.uid);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: user?.treeImg }} style={styles.tree} />
        <Text style={styles.subtitle}>나무 완성까지</Text>
        <Text style={styles.title}>{10 - (user?.totalCarbon % 10)}kg</Text>
      </View>
      <View style={styles.badge}>
        {badges.length != 0 ? (
          badges.map((badge) => (
            <Badge
              key={badge.badgeImgIdx}
              img={badge.filePath}
            />
          ))
        ) : (
          <Text>뱃지 없음</Text>
        )}
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
        <Badge/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  tree: {
    resizeMode: "contain",
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#848484",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
  },
  badge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default Tree;
