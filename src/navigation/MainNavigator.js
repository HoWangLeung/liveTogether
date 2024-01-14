import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLogin } from "../services/LoginProvider";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignInNavigator from "./SignInNavigator";
import MainTabNavigator from "./MainTabNavigator";
import CreateNewGroupScreen from "../screens/CreateNewGroupScreen/CreateNewGroupScreen";
import { Button, Text } from "react-native-paper";
import JoinExistingGroupScreen from "../screens/JoinExistingGroupScreen/JoinExistingGroupScreen";
import EditWasteDisposalScreen from "../screens/EditWasteDisposalScreen/EditWasteDisposalScreen";
import EditBinCollectionScreen from "../screens/EditBinCollectionScreen/EditBinCollectionScreen";
import EditGroupAndUserScreen from "../screens/EditGroupAndUserScreen/EditGroupAndUserScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen/ChangePasswordScreen";
import { useSelector } from "react-redux";
import CreateTaskScreen from "../screens/Task/CreateTaskScreen/CreateTaskScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
 
  const { isLoggedIn, userDetail } = useSelector((state) => state.userReducer);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
      
        },
      }}
    >
      <Stack.Screen
        name="Main"
        children={() => <MainTabNavigator userDetail={userDetail} />}
      />
      <Stack.Screen
        name="CreateNewGroupScreen"
        children={() => <CreateNewGroupScreen userDetail={userDetail} />}
      />

      <Stack.Screen
        name="JoinExistingGroupScreen"
        children={() => (
          <JoinExistingGroupScreen
          />
        )}
      />

      <Stack.Screen
        name="EditWasteDisposalScreen"
        children={() => <EditWasteDisposalScreen />}
      />
      <Stack.Screen
        name="EditBinCollectionScreen"
        children={() => <EditBinCollectionScreen />}
      />
      <Stack.Screen
        name="EditGroupAndUserScreen"
        children={() => <EditGroupAndUserScreen />}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        children={() => <ChangePasswordScreen />}
      />
      <Stack.Screen
        name="CreateTaskScreen"
        children={() => <CreateTaskScreen />}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
 
  const { isLoggedIn, userDetail } = useSelector((state) => {
    return state.userReducer;
  });

  
  const getFirstScreen = () => {
    if (isLoggedIn) {
      return <StackNavigator />;
    }

    return <SignInNavigator userDetail={userDetail} />;
  };

  return getFirstScreen();
};
export default MainNavigator;
