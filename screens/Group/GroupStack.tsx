import React from "react";
import Group from "./Group";
import GroupSetting from "./GroupSetting";
import AboutGroup from "./AboutGroup";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export const GroupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Group"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="GroupSetting" component={GroupSetting} />
      <Stack.Screen name="AboutGroup" component={AboutGroup} />
    </Stack.Navigator>
  );
};
export default GroupStack;
