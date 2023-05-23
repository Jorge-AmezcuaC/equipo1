import React, { useEffect, useState } from "react";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Favorito from "../screens/Favorito";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons"
import CustomButton from "../components/CustomButton";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  const { isSiggnedIn } = useSelector((state) => state.login);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
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
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "Cinema Meta",
              headerStyle: { backgroundColor: "#1d1d1d" },
              headerTitleStyle: {
                color: "#fff"
              },
              headerTitleAlign: "center",
              headerLeft: () => {
                <>
                <CustomButton onPress={() => navigation.navigate('Favorito')}>
                  <Ionicons name="heart-sharp" />
                </CustomButton>
                </>
              }
            })}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favorito"
            component={Favorito}
            options={{
              title: "Favoritos",
              headerStyle: { backgroundColor: "#1d1d1d" },
              headerTitleStyle: {
                color: "#fff"
              },
              headerTitleAlign: "center"
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
