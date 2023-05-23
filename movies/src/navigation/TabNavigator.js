import React from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { isLoggedIn, deleteRequestToken } from "../store/slices/login";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import Home from "../screens/Home";
import Favorito from "../screens/Favorito";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "FavoriteTab") {
            iconName = focused ? "heart-sharp" : "heart-outline";
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarInactiveBackgroundColor: "#2c2c2c",
        tabBarActiveBackgroundColor: "#2c2c2c",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: "Página de inicio",
          headerStyle: { backgroundColor: "#1d1d1d" },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginHorizontal: 17, width: 40 }}>
              <CustomButton
                onPress={() => {
                  dispatch(isLoggedIn(false));
                  AsyncStorage.removeItem("sessionId");
                  dispatch(deleteRequestToken(""));
                }}
              >
                <Ionicons name="log-out" size={20} />
              </CustomButton>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={Favorito}
        options={{
          title: "Favoritos",
          headerStyle: { backgroundColor: "#1d1d1d" },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginHorizontal: 17, width: 40 }}>
              <CustomButton
                onPress={() => {
                  dispatch(isLoggedIn(false));
                  AsyncStorage.removeItem("sessionId");
                  dispatch(deleteRequestToken(""));
                }}
              >
                <Ionicons name="log-out" size={20} />
              </CustomButton>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
