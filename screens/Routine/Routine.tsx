import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RoutineByGPT from "./RoutineByGPT";
import AboutRoutine from "./AboutRoutine";
import { AntDesign } from "@expo/vector-icons";

export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  AboutRoutine: { routineId: number };
  //makeRoutine: undefined;
};
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const Stack = createNativeStackNavigator();

// export const RoutineStack = ()=>{
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

import RoutineData from "../DB/DB_Routine";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {userID} from "../DB/userID";

const Routine = () => {
  // let userId = 0;
  // const [userId, setUserId] = useState(1);
  // const [MyRoutineList, setMyRoutineList] = useState(RoutineData.filter(item => item.id === userId));
  const MyRoutineList = RoutineData.filter(item => item.user_id === userID);

  // useEffect(()=>{



  // }, [MyRoutineList])
  // const getToken = async() =>{
  //   const token = await AsyncStorage.getItem('token');
  //   if (token ===null){
  //     return 0;
  //   }

  //   return parseInt(token);
  // }
  /* 내가만든운동 루틴 리스트 */

  // useEffect(()=>{
    


  // }, [MyRoutineList])

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const ShowRoutineList = () => {
    // let token = 1;
    return (
      <View
        style={{
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {MyRoutineList.map((item, index) => (

          <TouchableOpacity
            style={styles.box}
            key={index}
            onPress={() => {
              // showExerciseInfo();
              navigation.navigate("AboutRoutine", { routineId: item.id });
            }}
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.part}>{item.part}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const RoutineList = () => {
    return (
      <ScrollView style={styles.container}>
        <ShowRoutineList />
      </ScrollView>
    );
  };

  const GPTButton = () => {
    /* navigation은 같은 함수내에 존재해야함*/
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("RoutineByGPT");
        }}
      >
        <Text style={styles.buttonText}>GPT루틴 추천</Text>
      </TouchableOpacity>
    );
  };

  
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, backgroundColor: "#a5d8ff" }}>
        <View style={styles.gptButton}>
          <GPTButton />
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={{ flex: 9 }}>
        <RoutineList />

      </View>
    </View>
  );
};
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  gptButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "f8f9fa",
    marginTop: 30,
    marginRight: 20,
  },
  buttonContainer: {
    width: wp(35),
    //marginTop: wp(0),
    backgroundColor: "white",
    borderColor: themeColor,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: themeColor,
    //width: 200,
    //height: 50,
    marginRight: 20, // 우측 상단에 여백 추가
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "black", // 가로선의 색상 (예: 회색)
    // marginTop: 0, // 가로선 위 여백
    //marginBottom: 20, // 가로선 아래 여백
  },

  box: {
    backgroundColor: "#dee2e6",
    padding: 16,
    marginBottom: hp(1),
    borderRadius: 20,
    width: wp(90),
    marginTop: hp(1),
  },
  // name: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // part: {
  //   fontSize: 16,
  // },
  // date: {
  //   fontSize: 16,
  // },

  name: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "#343a40",
  },
  part: {
    fontSize: wp(3.5),
    color: "#495057",
  },
  date: {
    fontSize: wp(3.5),
    marginLeft: wp(10),
    color: "#495057",
  },
});

export default Routine;