import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ProgressBarAndroidComponent, //iOS는 ProgrssViewIOS 사용
  BackHandler,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { themeColor } from "../Home/Home";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as Progress from "react-native-progress";
const questions = [
  {
    id: 1,
    question: "어떤 유형의 식단을 짜드릴까요?",
    options: ["다이어트 식단", "벌크업 식단"],
    selectedOption: 0,
  },

  {
    id: 2,
    question: "혹시 피하는 음식이 있나요? 해당 사항이 있으면 선택해주세요",
    options: ["채식주의", "돼지고기", "닭고기", "소고기", "해당 없음"],
    selectedOption: 0,
  },
  // 추가적인 질문들 추가
];

export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  AboutRoutine: { routineId: number };
  MakeRoutine: undefined;
  PostDiet2GPT: { selectedOptions: string[] };
};

const RoutineByGPT = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  // navigate
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(1 / questions.length);

  const handleBackPress = () => {
    // if(currentQuestionIndex == questions.length-1){
    //   return true;
    // }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setProgress(currentQuestionIndex / questions.length);
      return true; // 이벤트를 소비하여 뒤로가기를 막음
    }
    return false;
  };

  /**스택을 공유하는 탭화면에서는 핸들러가 다른화면에서도 처리되는 경우가 존재
   * 이 핸들러때문에, 홈 탭에서 뒤로가기를 눌러도 아무런 동작을 하지 않는 현상 발생
   * -> 포커스를 얻을때만 핸들러 처리할 수 있도록 변경
   */
  useFocusEffect(
    React.useCallback(() => {
      const hardwareBackPress = () => handleBackPress();
      BackHandler.addEventListener("hardwareBackPress", hardwareBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", hardwareBackPress);
      };
    }, [currentQuestionIndex])
  );

  const Options = () => {
    return (
      <View>
        <Text style={styles.question}>
          {currentQuestionIndex +
            1 +
            ". " +
            questions[currentQuestionIndex].question}
        </Text>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            style={styles.box}
            key={index}
            onPress={() => handleOptionSelect(index)}
          >
            <Text>{index + 1 + ". " + option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleOptionSelect = (optionIndex: any) => {
    // 사용자의 선택을 추적
    questions[currentQuestionIndex].selectedOption = optionIndex;

    // 다음 질문으로 이동하거나, 마지막 질문이면 완료 버튼을 표시
    if (currentQuestionIndex < questions.length - 1) {
      setProgress((currentQuestionIndex + 2) / questions.length);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const selectedOptions: string[] = [];
      questions.forEach((item, index) => {
        if (item.selectedOption !== null && item.selectedOption !== undefined) {
          selectedOptions.push(item.options[item.selectedOption]);
        }
      });
      navigation.navigate("PostDiet2GPT", { selectedOptions: selectedOptions });
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={{alignSelf:"flex-start", flex:0.2}}>
        <MaterialCommunityIcons
          style={styles.backArrow}
          name="arrow-left"
          size={40}
          color="black"
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex-1)}
        />
      </TouchableOpacity> */}
      <View style={{ flex: 2 }}>
        <Text style={styles.title}>식단 추천 By GPT</Text>
        <Text style={styles.pageInstruction}>
          사용자님의 맞춤 식단 추천을 위해 몇가지 질문을 드릴게요!{" "}
        </Text>
        <Progress.Bar
          progress={progress}
          width={wp(90)}
          height={hp(1)}
          color="skyblue"
        />
        <View style={styles.separator}></View>
      </View>
      <View style={{ flex: 8 }}>
        <Options />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: hp(7),
    marginBottom: hp(0.3),
    // marginLeft: wp(29),
    color: "#374151",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    // marginTop: hp(7),
    // marginBottom: hp(0.3),
    marginVertical: hp(4),
    // marginLeft: wp(29),
    color: "#374151",
  },
  box: {
    backgroundColor: "#dee2e6",
    padding: 22,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
    // marginTop: hp(1),
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "#dee2e6", // 가로선의 색상 (예: 회색)
    justifyContent: "center",
    // marginTop: 0, // 가로선 위 여백
    //marginBottom: 20, // 가로선 아래 여백
  },
  backArrow: {
    position: "absolute",
    top: "100%",
    left: "10%",
    width: 40,
    height: 40,
  },
  pageInstruction: {
    fontSize: wp(3.5),
    marginLeft: wp(5),
    marginBottom: hp(1),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoutineByGPT;
