import { TextInput, StyleSheet, Text } from "react-native";
import { useField } from "formik";

const Input = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <TextInput
        style={[styles.shadowProp, styles.input]}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
      />
      {meta.error && meta.touched && <Text>{meta.error}</Text>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 13,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 40,
    width: "80%",
    marginVertical: 10,
    fontSize: 16,
    height: 45,
  },
});
