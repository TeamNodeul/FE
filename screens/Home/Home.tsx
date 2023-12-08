import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, Button } from "react-native-elements";
import BottomSheet from "../BottomSheet";
import data from "../../DB/DB_ExerciseList";
import axios from "axios";

//아이콘 임포트
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { userID, Login } from "../../DB/userID";

export type RootStackParam = {
  Home: undefined;
  BeforeCount: undefined;
  Group: undefined;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.5;

export const themeColor = "skyblue"; //"#E88C7D"; //테마 색상 #E88C7D

const date: string[] = [];
const initDate = new Date();
const lastDate = new Date(initDate);

let arrDayStr = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];

for (let i = 0; i < 7; i++) {
  if (i) lastDate.setDate(lastDate.getDate() - 1);
  date.push(
    `${lastDate.getMonth() + 1}월 ${lastDate.getDate()}일 ${
      arrDayStr[lastDate.getDay()]
    }`
  );
}

const CardFrame = (props: any) => {
  const { day, achievement, id } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.cardTitle}>{day}</Text>
            {/* <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{achievement}</Text>
            </View> */}
          </View>
        </View>
        <Card.Divider />
        <View style={styles.cardButton}>
          <TouchableOpacity onPress={pressButton}>
            <Text style={{ marginLeft: wp(14.5), marginTop: hp(1.2) }}>
              운동 기록 보기
            </Text>
          </TouchableOpacity>
          <BottomSheet
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            id={id}
          />
        </View>
      </Card>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const [state, updateState] = useState(0);
  let totalTimeOfTargetDate;

  const [, reloadState] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // console.log("마에페이지 포커스")
      // Do something when the screen is focused
      reloadState([]);
    }, [])
  );

  const handleBackPress = () => {
    Alert.alert(
      "종료하시겠습니까?",
      "오늘의 나는 어제의 나보다 더 강하다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            BackHandler.exitApp();
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
    const fetchData = async () => {
      try {
      } catch (error) {
        console.log("Post error...");
        console.log(error);
      }

      try {
        const timeResponse = await axios.get(
          `http://3.36.228.245:8080/api/histories/last-seven-days/${userID}`
        );
        console.log(timeResponse.data);

        const targetData = timeResponse.data.find(
          (item) =>
            item.date[0] === 2023 && item.date[1] === 12 && item.date[2] === 8
        );

        totalTimeOfTargetDate = targetData ? targetData.totalTime : 0;
        console.log(totalTimeOfTargetDate);

        updateState(totalTimeOfTargetDate);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.dateText}>
          Today: {year}년 {month}월 {day}일
        </Text>
        <View style={{ flex: 2 }}>
          <Text style={styles.timeText}>오늘 운동시간 : {state}분</Text>
          {/* 하루 누적 운동시간 넣어야 함 */}
        </View>
      </View>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate("BeforeCount")}
      >
        <View>
          <Text style={styles.ButtonText}>오늘의 운동 시작하기</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollPage}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <CardFrame day={date[6]} achievement="상" id={1} />
            <CardFrame day={date[5]} achievement="중" id={2} />
            <CardFrame day={date[4]} achievement="상" id={3} />
            <CardFrame day={date[3]} achievement="하" id={4} />
            <CardFrame day={date[2]} achievement="중" id={5} />
            <CardFrame day={date[1]} achievement="상" id={6} />
            <CardFrame day={date[0]} achievement="상" id={7} />
          </View>
        </ScrollView>
      </View>
      {/* <View style={styles.menuContainer}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={32} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    flex: 1.5,
    backgroundColor: themeColor, //약간 진한 오렌지
    width: "100%",
  },
  scrollContainer: {
    flex: 3,
    //flexDirection: "row",
    flexWrap: "wrap",
  },
  scrollPage: {},
  customButton: {
    width: wp(80),
    marginTop: 20,
    backgroundColor: "white",
    borderColor: themeColor,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  ButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  timeText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: wp(7),
    letterSpacing: 5,
  },
  menuContainer: {
    flex: 0.45,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  line: {
    marginTop: 20,
    width: "90%",
    height: 1,
    backgroundColor: "#dee2e6",
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    spaceBetween: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "#00b894",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  badge: {
    color: "white",
  },
  card: {
    width: wp(70),
    borderRadius: wp(5),
    marginVertical: hp(2),
  },
  cardButton: {
    width: wp(50),
    height: hp(5),
    marginLeft: wp(6),
    borderRadius: wp(10),
    borderWidth: wp(0.35),
    borderColor: themeColor,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
