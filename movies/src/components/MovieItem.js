import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import CustomButton from "./CustomButton";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 6,
    width: 360,
    marginTop: 15,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "bold"
  },
  button: {
    marginTop: 15,
  },
  desc: {
    fontSize: 15,
    color: "white",
    marginTop: 15,
    textAlign: "justify",
    paddingHorizontal: 10,
  },
  content: {
    width: 248,
    justifyContent: "center"
  }
});

const MovieItem = ({ onPress, text, desc, image }) => {
  const uri = "https://image.tmdb.org/t/p/w500" + image;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: uri }} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{text}</Text>
          <Text style={styles.desc} numberOfLines={5}>{desc}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <CustomButton onPress={onPress}>Ver Detalles</CustomButton>
      </View>
    </View>
  );
};

export default MovieItem;
