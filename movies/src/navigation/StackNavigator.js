import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Detail from "../screens/Detail";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedIn,
  sessionId,
} from "../store/slices/login";
import TabNavigator from "./TabNavigator";

import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedIn,
  sessionId,
} from "../store/slices/login";
import TabNavigator from "./TabNavigator";


const Stack = createStackNavigator();



const StackNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  const { isSiggnedIn } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    const getSessionId = async () => {
      const session = await AsyncStorage.getItem("sessionId");
      if (session) {
        dispatch(isLoggedIn(true));
        dispatch(sessionId(session));
      }
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    };
    getSessionId();

  }, []);
  const [showSplash, setShowSplash] = useState(true);

  const { isSiggnedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSessionId = async () => {
      const session = await AsyncStorage.getItem("sessionId");
      if (session) {
        dispatch(isLoggedIn(true));
        dispatch(sessionId(session));
      }
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    };
    getSessionId();
  }, []);

  return (
    <Stack.Navigator>
      {showSplash ? (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      ) : isSiggnedIn ? (
      {showSplash ? (
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      ) : isSiggnedIn ? (
        <>
          <Stack.Screen
            name="Home"

            component={TabNavigator}
            component={TabNavigator}
            options={{
              headerShown: false,
              headerShown: false,
            }}

          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              headerShown: false,


              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Registrarse",
              headerStyle: { backgroundColor: "#5af7f2" },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
