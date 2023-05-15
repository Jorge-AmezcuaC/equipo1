import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native"

const CustomButton = ({ children, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: "red",
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
})

export default CustomButton;
