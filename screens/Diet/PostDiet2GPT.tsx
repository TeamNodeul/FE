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

const PostDiet2GPT = ({ route }: any) => {
  //const { userId } = route.params.userId;
  const { selectedOptions } = route.params;
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

  const postAndGetDiet = async () => {
    try {
      const postResponse = await axios.post(
        `http://3.36.228.245:8080/api/diets/create/${userID}/gpt/diets`
      );
      console.log("POST 요청 성공:", postResponse.data);

      const getResponse = await axios.get(
        `http://3.36.228.245:8080/api/diets/find-all/${userID}/diets`
      );
      console.log("GET 요청 성공:", getResponse.data);
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);
  //const { selectedOptions } = route.params.selectedOptions;

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/loading.gif")} />
      <Text style={styles.text}>맞춤형 식단을 짜는 중이에요.</Text>
      <Text style={styles.text}>잠시만 기다려주세요!</Text>
      <View>
        {selectedOptions.map((item: string, index: number) => (
          <Text key={index} style={{ fontSize: 18 }}>
            {index + ". " + item}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={postAndGetDiet}>
        <Text>Test Button</Text>
      </TouchableOpacity>
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
