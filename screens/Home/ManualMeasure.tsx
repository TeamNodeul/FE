import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  Alert,
  BackHandler,
  ScrollView,
} from "react-native";
import { themeColor } from "./Home";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { exerciseId } from "./RoutineBottomSheet"; //선택한 루틴의 id
import data from "../../DB/DB_Routine";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { userID, Login } from "../../DB/userID";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.5;

export type RootStackParam = {
  Home: undefined;
  BeforeCount: undefined;
};

const ManualMeasure = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>(); //네비게이션

  //const routines = routineData?.exercises;

  const routineData = data.find((entry) => entry.id === exerciseId);
  const [setCount, setSetCount] = useState<number[]>(() => {
    const exerciseLen = routineData?.exercises.length;
    return Array.from({ length: exerciseLen }, () => 0);
  });

  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleIcon = () => {
    setIsIconVisible(!isIconVisible);
  };

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleStartStopButtonPress = () => {
    toggleIcon();
    startStop();
  };

  const handleBackPress = () => {
    if (navigation?.canGoBack()) {
      Alert.alert("운동 종료", formatTime(time) + " 기록되었습니다.", [
        {
          text: "확인",
        },
      ]);
      navigation.goBack();
      return true;
    }
    return false;
  };
  const handleExerciseDone = () => {
    Alert.alert("운동 종료", formatTime(time) + " 기록되었습니다.", [
      {
        text: "확인",
      },
    ]);
    navigation.pop();
    return true;
  };

  const handleSetDonePress = (index: number) => {
    if (setCount[index] + 1 === routineData?.exercises[index].sets) {
      const postData = {
        setCount: routineData?.exercises[index].sets,
        sportCount: routineData?.exercises[index].reps,
        volume: routineData?.exercises[index].weight,
        workOutTime: time,
      };

      try {
        axios.post(
          `http://3.36.228.245:8080/api/histories/create/${userID}/21/count-set`,
          postData
        );
        console.log("routine post done");
      } catch (error) {
        console.log(error);
      }
    }

    if (setCount[index] === routineData?.exercises[index].sets) {
      Alert.alert(
        "체력이 좋으시군요!",
        "이미 목표 세트 수를 채웠습니다.",
        [{ text: "확인", onPress: () => console.log("확인 버튼 눌림") }],
        { cancelable: false }
      );
    } else {
      setCount[index]++;
    }
    console.log(setCount[index]);
  };

  useEffect(() => {
    //스탑워치 부분
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  //==========================================================================================  return
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={{ flex: 0.5, marginTop: "10%", marginLeft: "5%" }}></View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.time}>{formatTime(time)}</Text>
          {isIconVisible ? (
            <TouchableOpacity
              style={{ marginLeft: "5%" }}
              onPress={handleStartStopButtonPress}
            >
              <Feather name="pause-circle" size={60} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ marginLeft: "5%" }}
              onPress={handleStartStopButtonPress}
            >
              <Feather name="play-circle" size={60} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleExerciseDone} //핸들링 구현 필요
          >
            <Text style={styles.ButtonText}>운동 종료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
      <View style={styles.recordContainer}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {routineData?.exercises.map((item, index) => (
              <View
                key={index}
                style={{
                  width: wp(90),
                  borderColor: "lightgrey",
                  borderWidth: 2,
                  borderRadius: wp(3),
                  marginLeft: wp(5),
                  marginBottom: hp(2),
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="dumbbell"
                    size={wp(8)}
                    color="black"
                    style={{ marginTop: wp(3.5), marginLeft: wp(3.5) }}
                  />
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      position: "absolute",
                      right: wp(20),
                      top: hp(2.3),
                    }}
                  >
                    {setCount[index]} 세트 완료
                  </Text>
                  <TouchableOpacity
                    hitSlop={{ top: 60, bottom: 60, left: 60, right: 60 }}
                    style={{ position: "absolute", right: wp(6), top: hp(2) }}
                    onPress={() => handleSetDonePress(index)}
                  >
                    <AntDesign name="checkcircle" size={wp(6)} color="black" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View style={styles.line}></View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: hp(1) }}>
                  <Text style={{ marginLeft: wp(3), fontSize: wp(3.5) }}>
                    {item.reps}회
                  </Text>
                  <Text style={{ marginLeft: wp(5), fontSize: wp(3.5) }}>
                    {item.sets}세트
                  </Text>
                  <Text style={{ marginLeft: wp(5), fontSize: wp(3.5) }}>
                    {item.weight}kg
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  timeContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: themeColor,
  },
  recordContainer: {
    flex: 6,
    width: "100%",
    backgroundColor: "#f8f9fa",
    marginTop: hp(2),
  },
  menuContainer: {
    flex: 1,
    background: "#f8f9fa",
  },
  line: {
    height: 1,
    width: "90%",
    backgroundColor: "#dee2e6",
    marginVertical: hp(1.5),
  },
  time: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 42,
    letterSpacing: 5,
  },
  customButton: {
    width: windowWidth * 0.8,
    backgroundColor: "white",
    borderColor: "white",
    marginTop: "2%",
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
  },
  ButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  screen: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: wp(5),
    marginTop: hp(2),
    marginLeft: wp(3),
  },
});

export default ManualMeasure;
