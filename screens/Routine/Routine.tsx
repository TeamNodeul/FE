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
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  AboutRoutine: { routineId: number };
  MakeRoutine: undefined;
};


import RoutineData from "../DB/DB_Routine";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {userID} from "../DB/userID";

const Routine = () => {

  const MyRoutineList = RoutineData.filter(item => item.user_id === userID);


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
              <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
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
        style={styles.gptButtonContainer || {width:"90%"}}
        onPress={() => {
          navigation.navigate("RoutineByGPT");
        }}
      >
        <Text style={styles.buttonText}>GPT에게 루틴 추천받기</Text>
      </TouchableOpacity>
    );
  };

  const MakeRoutineButton = () => {
    return (
      <TouchableOpacity
        style={styles.makeButton}
        onPress={() => {
          navigation.navigate("MakeRoutine");
        }}
      >
        <AntDesign name="pluscircle" size={90} color={"skyblue"} />
      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container}>
      <View style={{ flex: 2, width:"100%", alignContent:"center"}}>
          <Text style={styles.title}>내가 만든 루틴 리스트</Text>
          <View style={styles.separator}></View>
          <GPTButton/>
      </View>
      {/* <View style={styles.separator}></View> */}
      <View style={{ flex: 8 }}>
        <RoutineList />
        <MakeRoutineButton/>
      </View>
    </View>
  );
};
// const windowWidth = Dimensions.get("window").width;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  gptButtonContainer: {
    // width: wp(35),
    marginTop: "2%",
    marginBottom: "3%",
    backgroundColor: "skyblue",
    // borderColor: "blue",
    // borderWidth: 1,
    width:"90%",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
    alignSelf: "center",
  },
  gptButton: {
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
    color:"white",
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 0.5, // 가로선의 높이
    backgroundColor: "gray", // 가로선의 색상 (예: 회색)
    // marginTop: 0, // 가로선 위 여백
    //marginBottom: 20, // 가로선 아래 여백
  },

  box: {
    backgroundColor: "#dee2e6",
    padding: 22,
    marginBottom: hp(1),
    borderRadius: 20,
    width: wp(90),
    marginTop: hp(1),
  },
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
    // marginLeft: wp(10),
    color: "#495057",
  },

  makeButton: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    backgroundColor: "white",
    borderRadius: 100,
    // padding: 1,
    // elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: hp(5),
    marginBottom: hp(0.3),
    // marginLeft: wp(29),
    color: "#374151",
  },

  header: {
    flex: 0.5,
    width: "100%",
    padding: 20,
  },
  leftIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
});

export default Routine;
