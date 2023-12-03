import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import {data} from "./Routine"
import RoutineData from "../../DB/DB_Routine";
import { HomeStack } from "../../App";

export type RootStackParam = {
  BeforeCount : undefined,
};

export const AboutRoutine = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { routineId } = route.params;
  const routineInfo = RoutineData.find((item) => item.id === routineId);

  if (!routineInfo) {
    return (
      <View>
        <Text>해당 루틴을 찾을 수 없음</Text>
      </View>
    );
  }

  const ExerciseList = () => {
    

    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
        style={{
          // flex: 8,
          // marginTop:50
        }}
      >
        {routineInfo.exercises.map((item, index) => (
          //map쓸려면 고유키를 설정해줘야 경고 안뜸
          <View style={styles.box} key={index}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.contentText}>
              {item.reps}회 / {item.sets}세트 / {item.weight}kg
            </Text>
            <Text style={styles.contentText}>총 무게 : {item.reps * item.sets * item.weight}kg</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 3, justifyContent: "flex-end", marginBottom: wp(5) }}
      >
        <Text>현재 선택한 루틴 : {routineId}번 루틴 정보</Text>
        <View style={styles.separator}></View>
        <Text>루틴이름 : {routineInfo.name}</Text>
        <Text>운동부위 : {routineInfo.part}</Text>
        <Text>날짜 : {routineInfo.date}</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={{ flex: 7 }}>
        <ExerciseList />
      </View>

      <TouchableOpacity
        style={styles.startButton}
        // style={styles.makeButton}
        onPress={() => {
          // navigation.goBack();
          navigation.navigate("BeforeCount", )
        }}
      >
        <Text style={styles.startButtonText}>운동 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "f8f9fa",
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "black", // 가로선의 색상 (예: 회색)
    justifyContent: "center",
  },
  box: {
    // backgroundColor: "#dee2e6",
    padding: 16,
    marginVertical: hp(1),
    borderRadius: 20,
    width: wp(90),
    borderColor:"skyblue",
    borderWidth:2,
  },

  nameText: {
    fontSize: wp(5),
    fontWeight: "bold",
    // marginBottom: wp(1),
    // color: "grey",
  },
  contentText: {
    // fontSize: wp(5),
    // fontWeight: "bold",
    marginBottom: wp(1),
    // color: "grey",
  },

  startButton: {
    // flex: 1,
    // alignContent:"center",
    alignItems: "center",
    width: "90%",
    // marginTop: 10,
    marginBottom: 10,
    backgroundColor: "skyblue",
    // borderColor: "blue",
    // color: "red",
    // borderWidth: 1.5,
    borderRadius: 5,
    padding: 15,
  },
  startButtonText: {
    // alignContent:"center",
    // alignItems:"center",
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "white",
    // color: "#343a40",
  },
});

export default AboutRoutine;
