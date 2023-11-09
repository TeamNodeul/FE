import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import BeforeCount from "./Home/BeforeCount";
import NFCScreen from "../screens/Home/NFCScreen";
import ManualMeasure from "./Home/ManualMeasure";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="운동준비" component={BeforeCount} />
        <Stack.Screen name="NFCScreen" component={NFCScreen} />
        <Stack.Screen name="ManualMeasure" component={ManualMeasure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
