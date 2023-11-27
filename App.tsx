import * as React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AppNavigator from "./screens/AppNavigator";
import BleManager from "react-native-ble-manager";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Home 관련 페이지 */
import Home from "./screens/Home/Home";
import BeforeCount from "./screens/Home/BeforeCount";
import NFCScreen from "./screens/Home/NFCScreen";
import ManualMeasure from "./screens/Home/ManualMeasure";
import MyPage from "./screens/MyPage/MyPage";

/* Group 관련 페이지 */
import Group from "./screens/Group/Group";
import AboutGroup from "./screens/Group/AboutGroup";

/* 루틴관련 화면들은 RoutineStack에서 관리 */
import RoutineStack from "./screens/Routine/RoutineStack";

/* 식단 관련 화면 스택 */
import DietStack from "./screens/Diet/DietStack";
import GroupSetting from "./screens/Group/GroupSetting";

/* 아이콘 import */
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons"; 
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type HomeStackParamLIst = {
  Home: undefined;
};

type SettingsStackParamList = {
  Settings: undefined;
};

function GroupStack() {
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
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BeforeCount" component={BeforeCount} />
      <Stack.Screen name="NFCScreen" component={NFCScreen} />
      <Stack.Screen name="ManualMeasure" component={ManualMeasure} />
    </Stack.Navigator>
  );
}

// function RoutineStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Routine"
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Routine" component={Routine} />
//       <Stack.Screen name="RoutineByGPT" component={RoutineByGPT} />
//       <Stack.Screen name="AboutRoutine" component={AboutRoutine} />
//     </Stack.Navigator>
//   );
// }
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true, // 탭 레이블 숨기기 (선택사항)
        }}
      >
        <Tab.Screen
          name="홈"
          component={HomeStack}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="home" size={28} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="식단"
          component={DietStack}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="local-dining" size={28} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="루틴"
          component={RoutineStack}
          options={({ route }) => ({
            tabBarIcon: () => (
              <MaterialCommunityIcons name="dumbbell" size={28} color="black" />
            ),
            tabBarHideOnKeyboard: true,
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              // console.log(routeName);
              if (routeName !== "Routine") {
                return { display: "none" };
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen
          name="그룹"
          component={GroupStack}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="group" size={28} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPage}
          options={{
            tabBarIcon: () => (
              <Ionicons name="person-circle" size={28} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
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
