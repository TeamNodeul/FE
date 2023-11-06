import React, { Component, useState, useEffect, useRef } from "react";
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.5;

export type RootStackParam = {
  Home: undefined;
  BeforeCount: undefined;
};

const ManualMeasure = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>(); //네비게이션

  const [isIconVisible, setIsIconVisible] = useState(true);

  const toggleIcon = () => {
    setIsIconVisible(!isIconVisible);
  };

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const formatTime = (totalSeconds) => {
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

  const handleExerciseDone = () => {
    navigation.popToTop();

    Alert.alert("운동 종료", formatTime(time) + " 기록되었습니다.", [
      {
        text: "확인",
      },
    ]);
    return true;
  };

  useEffect(() => {
    //스탑워치 부분
    let interval;
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
    BackHandler.addEventListener("hardwareBackPress", handleExerciseDone);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleExerciseDone);
    };
  }, []);

  //==========================================================================================  return
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={{ flex: 0.5, marginTop: "10%", marginLeft: "5%" }}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
        <View style={{ flex: 0.6 }}>
          <Text style={{ marginLeft: "3%", marginTop: "2%" }}>불나방</Text>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={{ marginLeft: "3%", marginTop: "2%" }}>
            현재 n명 운동중
          </Text>
        </View>
        <View style={{ flex: 7 }}></View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.menuContainer}></View>
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
  },
  menuContainer: {
    flex: 1,
    background: "#f8f9fa",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#dee2e6",
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
});

export default ManualMeasure;
