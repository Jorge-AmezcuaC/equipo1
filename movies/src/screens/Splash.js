import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";

const Splash = ({ navigation }) => {
  const goToScreen = (stack) => {
    navigation.navigate(stack);
  };

  useEffect(() => {
    setTimeout(() => {
      goToScreen("Login");
    }, 4000);
  }, []);

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
