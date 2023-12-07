import React, { useEffect, useState } from "react";
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

import axios from "axios";


export type RootStackParam = {
  BeforeCount: undefined;
};

const formattedDate = (timestamp:Date)=>{
  const date = new Date(timestamp);
  return (`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`);
}

export const AboutRoutine = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { routineId } = route.params;
  const [ routineInfo, setRoutineInfo] = useState([] as {id:number, routineName:string, setCount:number, sportCount:number, sportName:string, volume:number, date:Date, totalWeight:number}[])
  const [routineName, setRoutineName] = useState("");
  const [part, setPart] = useState("");
  const [date, setDate] = useState("");

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.36.228.245:8080/api/sportRoutines/find-all/routine-list/${routineId}`);
        await setRoutineInfo(response.data);
        setRoutineName(response.data[0].routineName);
        setDate(formattedDate(response.data[0].date));
        // console.log(routineId);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[]);
  // const routineInfo = RoutineData.find((item) => item.id === routineId);

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
        style={
          {
            // flex: 8,
            // marginTop:50
          }
        }
      >
        {routineInfo.map((item, index) => (
          //map쓸려면 고유키를 설정해줘야 경고 안뜸
          <View
            key={index}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.box}>
              <Text style={styles.nameText}>{item.sportName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {item.sportCount}회 | {item.setCount}세트 | {item.volume}kg
                </Text>
                <Text style={{ position: "absolute", right: wp(1) }}>
                  총 무게 : {item.sportCount * item.setCount * item.volume}kg
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  const PrintRoutineId = () => {
    console.log(routineId);
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, marginBottom: wp(5) }}>
        <PrintRoutineId />
        <Text style={styles.routineName}>{routineName}</Text>
        {/* <Text style={styles.routineInfo}>운동부위 : {part}</Text> */}
        <Text style={styles.routineInfo}>생성날짜 : {date}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.separator}></View>
      </View>
      <View style={{ flex: 10 }}>
        <ExerciseList />
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.startButton}
          // style={styles.makeButton}
          onPress={() => {
            // navigation.goBack();
            navigation.navigate("BeforeCount");
          }}
        >
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "f8f9fa",
  },
  separator: {
    width: "90%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "#dee2e6", // 가로선의 색상 (예: 회색)
    justifyContent: "center",
    marginVertical: hp(1),
  },
  box: {
    // backgroundColor: "#dee2e6",
    padding: 16,
    marginVertical: hp(1),
    borderRadius: 20,
    width: wp(90),
    borderColor: "skyblue",
    borderWidth: 2,
  },

  nameText: {
    fontSize: wp(4.3),
    fontWeight: "600",
    marginBottom: hp(0.5),

    // marginBottom: wp(1),
    // color: "grey",
  },
  startButton: {
    // flex: 1,
    width: "90%",
    // marginTop: 10,
    marginBottom: 10,
    backgroundColor: "skyblue",
    // borderColor: "blue",
    // color: "red",
    // borderWidth: 1.5,
    borderRadius: wp(20),
    padding: 15,
  },
  startButtonText: {
    // alignContent:"center",
    // alignItems:"center",
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "white",
    alignSelf: "center",
    // color: "#343a40",
  },
  routineName: {
    alignSelf:"center",
    fontWeight:"bold",
    fontSize: wp(10),
    marginTop: hp(8),
    marginBottom: hp(2),
    // marginLeft: wp(6),
  },
  routineInfo: {
    alignSelf:"flex-end",
    marginRight: wp(6),
    fontSize: wp(4),
    marginVertical: hp(0.5),
  },
});

export default AboutRoutine;
