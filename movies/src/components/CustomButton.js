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
    backgroundColor: "#22caee",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
})

export default CustomButton;
