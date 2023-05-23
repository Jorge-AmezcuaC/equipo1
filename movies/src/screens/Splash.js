import { View, Image, StyleSheet } from "react-native";
import React from "react";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/CineMeta.png")} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 650,
    width: 450,
    marginBottom: 25,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
