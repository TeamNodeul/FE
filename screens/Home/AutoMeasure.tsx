import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  BackHandler,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { themeColor } from "./Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export type RootStackParam = {
  NFCScreen: undefined;
  AutoMeasure: undefined;
  ManualMeasure: undefined;
  TakingBreak: undefined;
};

const AutoMeasure = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [count, setCount] = useState(0);
  const scaleValue = new Animated.Value(1);
  const resetThreshold = 10;

  const handleAreYouDone = () => {
    Alert.alert(
      "운동 종료",
      "운동 측정을 종료하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleAreYouDone);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleAreYouDone);
    };
  }, []);

  const startAnimation = () => {
    if (count === resetThreshold - 1) {
      navigation.navigate("TakingBreak");
      setCount(0);
    } else {
      setCount(count + 1);
    }

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };
  //구현 예정
  return (
    <View>
      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={startAnimation}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Text style={styles.countStyle}>{count}회</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.routineContainer}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAreYouDone}>
          <View style={styles.buttonStyle}>
            <Text>측정 종료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    height: hp(50),
    backgroundColor: themeColor,
    alignItems: "center",
    justifyContent: "center",
  },
  countStyle: {
    fontSize: wp(30),
    color: "white",
  },
  routineContainer: {
    height: hp(40),
    backgroundColor: "white",
  },
  buttonContainer: {
    height: hp(10),
    backgroundColor: "white",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttonStyle: {
    width: wp(80),
    height: hp(5),
    borderWidth: wp(0.5),
    borderColor: "skyblue",
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AutoMeasure;
