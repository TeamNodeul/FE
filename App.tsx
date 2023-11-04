import * as React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import BleManager from "react-native-ble-manager";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import BeforeCount from "./screens/BeforeCount";
import NFCScreen from "./screens/NFCScreen";
import ManualMeasure from "./screens/ManualMeasure";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BeforeCount" component={BeforeCount} />
        <Stack.Screen name="NFCScreen" component={NFCScreen} />
        <Stack.Screen name="ManualMeasure" component={ManualMeasure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#CCCCCC",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    margin: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default App;
