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
import AboutRoutine from "./RoutineInfo";

export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  AboutRoutine: { routineId: number };
  //makeRoutine: undefined;
};

export const data = [
  {
    id: 1,
    name: "하체왕 되는 루틴",
    part: "하체",
    date: "2023년9월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 80 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 100 },
      // 다른 운동 추가
    ],
  },
  {
    id: 10,
    name: "3분할운동",
    part: "하체 가슴 등",
    date: "2023년10월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 90 },
      { id: 3, name: "벤치프레스", sets: 3, reps: 12, weight: 70 },
      // 다른 운동 추가
    ],
  },
  {
    id: 20,
    name: "2분할",
    part: "하체 가슴 등 어깨",
    date: "2023년11월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 85 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 110 },
      { id: 4, name: "숄더프레스", sets: 3, reps: 12, weight: 50 },
      // 다른 운동 추가
    ],
  },
  {
    id: 40,
    name: "내가 만든 루틴4",
    part: "하체",
    date: "2023년12월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 75 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 95 },
      // 다른 운동 추가
    ],
  },
  {
    id: 100,
    name: "내가 만든 루틴5",
    part: "하체",
    date: "2023년11월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 85 },
      { id: 3, name: "벤치프레스", sets: 3, reps: 12, weight: 75 },
      { id: 4, name: "숄더프레스", sets: 3, reps: 12, weight: 55 },
      // 다른 운동 추가
    ],
  },
];

const Routine = () => {
  /* 내가만든운동 루틴 리스트 */
  const [animation] = useState(new Animated.Value(0));

  // const showExerciseInfo = () => {
  //   // 여기에서 선택한 운동 정보에 대한 처리를 수행하면 됩니다.
  //   // 현재는 간단하게 콘솔에 로그를 출력하는 예시 코드를 작성합니다.
  //   // console.log(`운동 ${exerciseId}의 세트 수: ${getSetsForExercise(exerciseId)}`);

  //   // 버튼을 누를 때마다 애니메이션 효과를 줍니다.
  //   Animated.timing(animation, {
  //     toValue: 1, // 1로 설정하면 화면이 올라옵니다.
  //     duration: 500, // 애니메이션 소요 시간 (밀리초)
  //     useNativeDriver: false, // 네이티브 드라이버 사용 여부
  //   }).start();
  // };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const ShowRoutineList = () => {
    return (
      <View
        style={{
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.map((item, index) => (
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
      <View style={{ flex: 2, backgroundColor: "skyblue" }}>
        <View style={styles.gptButton}>
          <GPTButton />
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={{ flex: 9 }}>
        <RoutineList />
        {/* <View style={styles.container}>
          <GPTButton/>
        </View> */}
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
    width: 130,
    marginTop: 20,
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
    marginTop: 0, // 가로선 위 여백
    marginBottom: 20, // 가로선 아래 여백
  },

  box: {
    backgroundColor: "#dee2e6",
    padding: 16,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
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
