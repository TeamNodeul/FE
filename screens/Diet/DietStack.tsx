import React from "react";
import Diet from "./Diet";
import DietByGPT from "./DietByGPT";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export const DietStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Diet"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Diet" component={Diet} />
      <Stack.Screen name="DietByGPT" component={DietByGPT} />
    </Stack.Navigator>
  );
};

export default DietStack;
