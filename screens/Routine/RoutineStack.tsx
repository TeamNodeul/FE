import React from "react";
import Routine from "./Routine";
import RoutineByGPT from "./RoutineByGPT";
import AboutRoutine from "./AboutRoutine";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export const RoutineStack = ()=>{
    return (
        <Stack.Navigator
        initialRouteName="Routine"
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name="Routine" component={Routine} />
        <Stack.Screen name="RoutineByGPT" component={RoutineByGPT} />
        <Stack.Screen name="AboutRoutine" component={AboutRoutine} />
        </Stack.Navigator>
    );
}
export default RoutineStack;