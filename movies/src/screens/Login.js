
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import {
  axiosRequestToken,
  changeWebValue,
  sessionId,
  isLoggedIn,
} from "../store/slices/login";

const Login = () => {

  const [isSessionId, setIsSessionId] = useState(false);


  const dispatch = useDispatch();
  let idInterval;

  const { web, tokens } = useSelector((state) => state.login);

  const submit = () => {
    dispatch(axiosRequestToken());
  };

  const isTokenApproved = async () => {
    const url =
      "https://api.themoviedb.org/3/authentication/session/new?api_key=af168e8969d69372dcccc733bfb642ff";
    const response = await axios.post(url, {
      request_token: tokens.requestToken,
    });

    if (response.status === 200) {
      AsyncStorage.setItem("sessionId", response.data.session_id);
      dispatch(sessionId(response.data.session_id));
      dispatch(isLoggedIn(true));
      clearInterval(idInterval);
    }
  };

  useEffect(() => {
    if (tokens.requestToken) {
      dispatch(changeWebValue(true));
      idInterval = setInterval(isTokenApproved, 5000);
    } else {
      dispatch(changeWebValue(false));
    }
  }, [tokens.requestToken]);

  return web ? (
    <WebView
      style={styles.container}
      source={{
        uri: `https://www.themoviedb.org/authenticate/${tokens.requestToken}`,
      }}
    />
  ) : (
    <View style={styles.container}>
      <View style={[styles.circle, styles.positionCircle1]} />
      <View style={[styles.circle, styles.positionCircle2]} />
      <View style={styles.center}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.sesion}>Iniciar Sesión</Text>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Ionicons
            style={styles.iconButton}
            name="ios-arrow-forward"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
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
