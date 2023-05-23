import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";

const RecommendedMovie = ({ image, text, onPress }) => {
  const uri = "https://image.tmdb.org/t/p/w500" + image;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: uri }} />
      </TouchableOpacity>
      <Text style={styles.title} >{text}</Text>
    </View>
  );
};

export default RecommendedMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    margin: 15,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 5,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5
  }
});
