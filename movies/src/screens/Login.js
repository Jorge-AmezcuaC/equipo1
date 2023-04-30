import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";

const Login = ({ navigation }) => {
  useEffect(() => {
    StatusBar.setHidden(true, "none");
  });
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.positionCircle1]} />
      <View style={[styles.circle, styles.positionCircle2]} />
      <Formik initialValues={{ email: "", password: "" }}>
        {({ handleSubmit }) => (
          <View style={styles.center}>
            <Text style={styles.title}>Login</Text>
            <Input name="email" placeholder="Correo" />
            <Ionicons
              style={styles.icon}
              name="ios-person"
              size={20}
              color="#000"
            />
            <Input
              name="password"
              placeholder="Contraseña"
              secureTextEntry={true}
            />
            <Ionicons
              style={styles.icon}
              name="ios-lock-closed"
              size={20}
              color="#000"
            />
            <Text style={styles.sesion}>Iniciar Sesión</Text>
            <TouchableOpacity style={styles.button}>
              <Ionicons
                style={styles.iconButton}
                name="ios-arrow-forward"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={[styles.circle, styles.positionCircle3]} />
      <View style={[styles.circle, styles.positionCircle4]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  circle: {
    backgroundColor: "#FF1700",
    width: 260,
    borderRadius: 260 / 2,
    position: "absolute",
    height: 260,
  },
  positionCircle1: {
    top: -160,
    zIndex: 2,
  },
  positionCircle2: {
    left: -130,
    backgroundColor: "#F9451D",
    zIndex: 1,
    top: -60,
  },
  positionCircle3: {
    bottom: -160,
    right: -10,
    zIndex: 2,
  },
  positionCircle4: {
    bottom: -60,
    right: -130,
    backgroundColor: "#F9451D",
    zIndex: 1,
  },
  sesion: {
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    marginTop: 15,
  },
  icon: {
    top: -44,
    left: -130,
  },
  button: {
    bottom: 35,
    right: 50,
    alignSelf: "flex-end",
    backgroundColor: "#F9451D",
    width: 60,
    borderRadius: 30,
    padding: 5,
  },
  iconButton: {
    alignSelf: "center",
  },
});

export default Login;
