import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//아이콘 임포트
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParam = {
  Home: undefined;
  BeforeCount: undefined;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.5;

export const themeColor = "#E88C7D"; //테마 색상 #E88C7D

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.dateText}>
          Today: {year}년 {month}월 {day}일
        </Text>
        <View style={{ flex: 2 }}>
          <Text style={styles.timeText}>00:00:00</Text>
          {/* 하루 누적 운동시간 넣어야 함 */}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate("BeforeCount")}
        >
          <Text style={styles.ButtonText}>오늘의 운동 시작하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollPage}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text></Text>
        </ScrollView>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  header: {
    flex: 1.5,
    backgroundColor: themeColor, //약간 진한 오렌지
    width: "100%",
  },
  emptyContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 3,
  },
  scrollPage: {},
  customButton: {
    width: windowWidth * 0.8,
    marginTop: 20,
    backgroundColor: "white",
    borderColor: themeColor,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
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
    fontSize: 42,
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
});

export default Home;
