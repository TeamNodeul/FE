import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { themeColor } from "../Home/Home";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import { initDate, lastDate } from "../../DB/DB_Diet";
import { userID } from "../../DB/userID";
//import DB_Diet from "../../DB/DB_Diet";

export type RootStackParam = {
  Diet: undefined;
  DietByGPT: undefined;
  CreateDietManual: undefined;
  PostDiet2GPT: undefined;
};

const day = [];

let arrDayStr = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

let breakfastArray: string[] = [];
let lunchArray: string[] = [];
let dinnerArray: string[] = [];

for (let i = 0; i < 3; i++) {
  if (i) lastDate.setDate(lastDate.getDate() + 1);
  day.push(
    `${lastDate.getMonth() + 1}월 ${lastDate.getDate()}일 ${
      arrDayStr[lastDate.getDay()]
    }`
  );
}

const Diet = () => {
  const options = { month: "numeric", day: "numeric" };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [state, updateState] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const dietData = [
    {
      index: 1,
      day: "12월 8일 금요일",
      breakfast: breakfastArray[0],
      lunch: lunchArray[0],
      dinner: dinnerArray[0],
    },
    {
      index: 2,
      day: "12월 9일 토요일",
      breakfast: breakfastArray[1],
      lunch: lunchArray[1],
      dinner: dinnerArray[1],
    },
    {
      index: 3,
      day: "12월 10일 일요일",
      breakfast: breakfastArray[2],
      lunch: lunchArray[2],
      dinner: dinnerArray[2],
    },
  ];

  async function api() {
    try {
      const postResponse = await axios.post(
        `http://3.36.228.245:8080/api/diets/create/${userID}/gpt/diets`
      );
      console.log(postResponse.data);
    } catch (error) {
      console.log("Post Error..");
      console.error("Error:", error);
    }

    try {
      const getResponse = await axios.get(
        `http://3.36.228.245:8080/api/diets/find-all/${userID}/diets`
      );
      console.log(getResponse.data);
      const jsonData = getResponse.data;

      const dietData = JSON.parse(jsonData[0].diet);

      breakfastArray = [];
      lunchArray = [];
      dinnerArray = [];

      Object.values(dietData).forEach((dayData: any) => {
        dayData.forEach((mealData: any) => {
          const { mealTime, menu, amount, unit } = mealData;

          switch (mealTime) {
            case "breakfast":
              breakfastArray.push("아침: " + menu + " " + amount + unit);
              break;
            case "lunch":
              lunchArray.push("점심: " + menu + " " + amount + unit);
              break;
            case "dinner":
              dinnerArray.push("저녁: " + menu + " " + amount + unit);
              break;
            default:
              break;
          }
        });
      });
      updateState(state + 1);
    } catch (error) {
      console.log("Get Error");
      console.error("Error:", error);
    }
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://3.36.228.245:8080/api/diets/find-all/${userID}/diets`
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error: ", error);
  //     }
  //   };

  //   fetchData();
  // });

  const handleManualCreateButtonPress = () => {
    Alert.alert("식단 설정", "식단을 직접 설정하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          navigation.navigate("CreateDietManual");
        },
      },
    ]);
  };

  const handleCreateButtonPress = () => {
    Alert.alert("식단 추천", "GPT 식단 추천을 받으시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          navigation.navigate("DietByGPT");
        },
      },
    ]);
  };

  function handleAPI() {
    console.log("식단 추천 눌림");
    toggleVisibility();
    api().then(() => setIsVisible(false));
    return true;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: hp(3) }}></View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>식단 계획</Text>
          <TouchableOpacity onPressOut={handleManualCreateButtonPress}>
            <AntDesign
              name="pluscircleo"
              size={wp(6)}
              color={themeColor}
              style={{ marginTop: hp(0.5), marginLeft: -wp(53) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateButtonPress}>
            <AntDesign
              name="edit"
              size={wp(6)}
              color={themeColor}
              style={{ marginTop: hp(0.5), marginLeft: wp(25) }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dayText}>
          {/* {initDate.toLocaleDateString(undefined, options)} ~{" "}
          {lastDate.toLocaleDateString(undefined, options)} */}
          12.8. ~ 12.10.
        </Text>
        {dietData.map((item, index) => (
          <View style={styles.dayContainer} key={index}>
            {renderDay(index, item.day, [
              item.breakfast,
              item.lunch,
              item.dinner,
            ])}
          </View>
        ))}
        {isVisible && (
          <Image
            style={{ position: "absolute", top: hp(30), left: wp(25) }}
            source={require("../../assets/loading.gif")}
          />
        )}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: hp(85),
          left: wp(10),
          width: wp(80),
          height: hp(5),
          borderRadius: wp(3),
          backgroundColor: "skyblue",
        }}
      >
        <TouchableOpacity onPress={handleAPI}>
          <Text style={{ color: "white" }}>식단 가져오기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function renderDay(day: any, weekday: any, meals: any) {
  return (
    <View style={styles.dayCard} key={day}>
      <View style={[styles.dayHeader, { backgroundColor: getDayColor(day) }]}>
        <Text style={styles.dayHeaderText}>{weekday}</Text>
      </View>
      <View style={styles.mealContainer}>
        {meals.map((meal: any, index: any) => (
          <Text style={styles.mealText} key={index}>
            {meal}
          </Text>
        ))}
      </View>
    </View>
  );
}

function getDayColor(day: any) {
  return themeColor;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(0.3),
    marginLeft: wp(35),
    color: "#374151",
  },
  dayText: {
    textAlign: "center",
    fontSize: wp(4),
    fontWeight: "700",
    color: "#374151",
  },
  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayCard: {
    width: wp(92),
    marginVertical: 10,
  },
  dayHeader: {
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
  },
  dayHeaderText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  mealContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    marginTop: 8,
  },
  mealText: {
    fontSize: wp(3.7),
    marginBottom: 8,
  },
});

export default Diet;
