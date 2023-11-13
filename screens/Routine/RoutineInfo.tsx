import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
} from "react-native";
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {data} from "./Routine"

const AboutRoutine = ({route } : any) => {
  const {routineId} = route.params;
  const routineInfo = data.find(item => item.id === routineId);
  if(!routineInfo){
    return(
      <View>
        <Text>해당 루틴을 찾을 수 없음</Text>
      </View>
    )

  }
  //구현 예정
  return (
    <View style={styles.container}>
      <Text>현재 선택한 루틴 : {routineId}번 루틴 정보</Text>
      <Text>루틴이름 : {routineInfo.name}</Text>
      <Text>운동부위 : {routineInfo.part}</Text>
      <Text>날짜 : {routineInfo.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "f8f9fa",
  },
});

export default AboutRoutine;
