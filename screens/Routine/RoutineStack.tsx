import React from "react";
import Routine from "./Routine";
import RoutineByGPT from "./RoutineByGPT";
import AboutRoutine from "./AboutRoutine";
import MakeRoutine from "./MakeRoutine";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post2GPT from "./Post2GPT";
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
            <Stack.Screen name="MakeRoutine" component={MakeRoutine} />
            <Stack.Screen name="Post2GPT" component={Post2GPT} />
        </Stack.Navigator>
    );
}
export default RoutineStack;