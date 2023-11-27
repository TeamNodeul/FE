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
  Alert,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import { dietData as data, initDate, lastDate } from "../../DB/DB_Diet";
//import DB_Diet from "../../DB/DB_Diet";

export type RootStackParam = {
  Diet: undefined;
  DietByGPT: undefined;
};

const Diet = () => {
  const options = { month: "numeric", day: "numeric" };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: hp(3) }}></View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>주간 식단 계획</Text>
          <TouchableOpacity onPressOut={handleCreateButtonPress}>
            <AntDesign
              name="edit"
              size={wp(6)}
              color={themeColor}
              style={{ marginTop: hp(0.5), marginLeft: wp(20) }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dayText}>
          {initDate.toLocaleDateString()} ~ {lastDate.toLocaleDateString()}
        </Text>
        {data.map((item, index) => (
          <View style={styles.dayContainer} key={index}>
            {renderDay(index, item.day, item.dayOfWeek, [
              item.breakfast,
              item.lunch,
              item.dinner,
            ])}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

function renderDay(day: any, weekday: any, weekOfDay: any, meals: any) {
  return (
    <View style={styles.dayCard} key={day}>
      <View style={[styles.dayHeader, { backgroundColor: getDayColor(day) }]}>
        <Text style={styles.dayHeaderText}>
          {weekday} {weekOfDay}
        </Text>
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
  // 여기에서 각 요일에 따라 배경색을 설정할 수 있습니다.
  // 예: 월요일 - '#10b981', 화요일 - '#f97316', ...
  /*switch (day) {
    case 0:
      return "#10b981";
    case "화요일":
      return "#f97316";
    case "수요일":
      return "#3b82f6";
    case "목요일":
      return "#6d28d9";
    case "금요일":
      return "#f43f5e";
    case "토요일":
      return "#ef4444";
    case "일요일":
      return "#6366f1";
    default:
      return "#ccc";
  }*/
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
    marginLeft: wp(29),
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
