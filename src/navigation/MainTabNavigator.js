import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import LogScreen from "../screens/LogScreen/LogScreen";
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const MainTabNavigator = ({ userDetail, setUserDetail }) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (Object.keys(userDetail).length == 0) {
      navigation.navigate("SignIn", { screen: "SignIn" });
    }

    return () => {};
  }, [userDetail]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-outline"
              : "person-circle-outline";
          } else if (route.name === "Logs") {
            iconName = focused ? "reader-outline" : "reader-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Logs" component={LogScreen} />
      <Tab.Screen name="Profile" children={() => <ProfileScreen />} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
