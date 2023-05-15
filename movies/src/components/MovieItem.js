import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    backgroundColor: 'black',
    marginBottom: 15,
    borderBottomWidth: 6,
    borderBottomColor: 'red',
    padding: 9,
    borderRadius: 6,
  },
  image: {
    width: 355,
    height: 500,
    borderRadius: 5,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 12,
  },
  button: {
    width: 364,
    marginTop: 15,
  },
  desc: {
    fontSize: 15,
    color: 'white',
    marginTop: 15,
  },
});

const MovieItem = ({ onPress, text, desc, image }) => {

    const uri = 'https://image.tmdb.org/t/p/w500' + image
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: uri }} />
        <Text style={styles.name}>{text}</Text>
      </View>
      <Text style={styles.desc}>{desc}</Text>
      <View style={styles.button}>
        <CustomButton onPress={onPress}>Ver Detail</CustomButton>
      </View>
    </View>
  );
};

export default MovieItem;