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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import {data} from "./Routine"
import RoutineData from "../DB/DB_Routine";

const AboutRoutine = ({route } : any) => {
  const {routineId} = route.params;
  const routineInfo = RoutineData.find(item => item.id === routineId);
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
      <View style={{
        //flex: 9,
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        <Text>현재 선택한 루틴 : {routineId}번 루틴 정보</Text>
          <Text>루틴이름 : {routineInfo.name}</Text>
          <Text>운동부위 : {routineInfo.part}</Text>
          <Text>날짜 : {routineInfo.date}</Text>
          <Text></Text>
        {
          routineInfo.exercises.map((item, index) => (
            //map쓸려면 고유키를 설정해줘야 경고 안뜸
            <View style={styles.box} key={index}>  
            
                <Text style={styles.name}>{item.name}</Text>
              <Text>{item.reps}회 / {item.sets}세트 / {item.weight}kg</Text>
              <Text>총 무게 : {item.reps * item.sets * item.weight}kg</Text>
            </View>
        ))
        }
      </View>
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

  box: {
    backgroundColor: "#d0ebff",
    padding: 16,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
  },

  name: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "#343a40",
  },
});

export default AboutRoutine;