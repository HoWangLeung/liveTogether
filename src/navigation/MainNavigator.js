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

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail } = useLogin();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Main"
        children={() => (
          <MainTabNavigator
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          />
        )}
      />
      <Stack.Screen
        name="CreateNewGroupScreen"
        children={() => (
          <CreateNewGroupScreen
            userDetail={userDetail}
            setUserDetail={setUserDetail}
          />
        )}
      />

      <Stack.Screen
        name="JoinExistingGroupScreen"
        children={() => (
          <JoinExistingGroupScreen
            userDetail={userDetail}
            setUserDetail={setUserDetail}
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
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, setIsLoggedIn, userDetail, setUserDetail } = useLogin();

  const getFirstScreen = () => {
    if (isLoggedIn) {
      return <StackNavigator />;
    }

    return (
      <SignInNavigator userDetail={userDetail} setUserDetail={setUserDetail} />
    );
  };

  return getFirstScreen();
};
export default MainNavigator;
