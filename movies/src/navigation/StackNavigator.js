import React from "react";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Favorito from "../screens/Favorito";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const isSiggnedIn = false;

  return (
    <Stack.Navigator>
      {isSiggnedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Cinema Meta",
              headerStyle: { backgroundColor: "#5af7f2" },
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: "Detalle",
              headerStyle: { backgroundColor: "#5af7f2" },
            }}
          />
          <Stack.Screen
            name="Favorito"
            component={Favorito}
            options={{
              title: "Favoritos",
              headerStyle: { backgroundColor: "#5af7f2" },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
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
