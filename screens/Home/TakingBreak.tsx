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
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  ScrollView,
  Image,
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

export type RootStackParam = {
  Home: undefined;
  BeforeCount: undefined;
};

const TakingBreak = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [remainingTime, setRemainingTime] = useState(5);

  const handleBackPress = () => {
    Alert.alert(
      "휴식 종료",
      "휴식을 일찍 종료하시겠습니까?",
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
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);

      if (remainingTime < 1) {
        // 남은 시간이 0 이하면 전 페이지로 이동
        clearInterval(intervalId);
        navigation.goBack();
      }
    }, 1000);

    // 컴포넌트가 언마운트되면 인터벌 클리어
    return () => clearInterval(intervalId);
  }, [navigation, remainingTime]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/loading2.gif")}
        style={{ position: "absolute" }}
      />
      <Text style={styles.textStyle}>휴식</Text>
      <Text style={styles.timeTextStyle}>{remainingTime}초</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: wp(8),
  },
  timeTextStyle: {
    fontSize: wp(20),
    fontWeight: "600",
  },
});

export default TakingBreak;
