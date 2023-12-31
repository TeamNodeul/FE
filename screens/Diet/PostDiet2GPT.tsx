import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { userID } from "../../DB/userID";
//import Loading from "../../assets/image/loading.gif";

type Post2GPTProps = {
  route: {
    params: {
      selectedOptions: string[]; // 실제 타입은 이에 맞게 수정
    };
  };
  // 나머지 스크린의 프로퍼티들...
};

export type RootStackParam = {};

const PostDiet2GPT = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const handleBackPress = () => {
    Alert.alert(
      "종료하시겠습니까?",
      "루틴 생성을 중단하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            navigation.popToTop();
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

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/loading.gif")} />
      <Text style={styles.text}>맞춤형 식단을 짜는 중이에요.</Text>
      <Text style={styles.text}>잠시만 기다려주세요!</Text>
      {/* <Text style={styles.text}>{selectedOptions[1]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "30%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    // color: 'blue',
    // alignSelf: "flex-start"
  },
});

export default PostDiet2GPT;
