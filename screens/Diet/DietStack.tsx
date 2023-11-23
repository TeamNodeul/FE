import React from "react";
import Diet from "./Diet";
import DietByGPT from "./DietByGPT";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDiet2GPT from "./PostDiet2GPT";
const Stack = createNativeStackNavigator();

export const DietStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Diet"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Diet" component={Diet} />
      <Stack.Screen name="DietByGPT" component={DietByGPT} />
      <Stack.Screen name="PostDiet2GPT" component={PostDiet2GPT} />
    </Stack.Navigator>
  );
};

export default DietStack;
