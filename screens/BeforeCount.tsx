import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { themeColor } from "./Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export type RootStackParam = {
  NFCScreen: undefined;
  AutoMeasure: undefined;
  ManualMeasure: undefined;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.9;

const BeforeCount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const handleManualButtonPress = () => {
    Alert.alert(
      "바로 운동 시작하기",
      "기기와 연동 없이 바로 운동을 시작합니다!",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("ManualMeasure");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.45 }}></View>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={styles.leftIcon}
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => navigation.pop()}
          />
        </TouchableOpacity>
        {/* <Feather
          style={styles.rightIcon}
          name="home"
          size={30}
          color="black"
          onPress={() => navigation.popToTop()}
        /> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => alert("운동 루틴을 불러옵니다")} //구현 예정
        >
          <Text style={styles.ButtonText}>운동 루틴 불러오기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("NFCScreen")}
        >
          <Text style={styles.ButtonText}>블루투스 연동해서 측정하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttonStyle, { width: buttonWidth }]}>
          <Text style={styles.ButtonText} onPress={handleManualButtonPress}>
            바로 운동 시작하기
          </Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flex: 0.5,
    width: "100%",
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 8,
  },
  buttonStyle: {
    backgroundColor: themeColor,
    padding: 11,
    borderRadius: 15,
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
  },
  leftIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  rightIcon: {
    position: "absolute",
    top: 20,
    right: 15,
    width: 40,
    height: 40,
  },
});

export default BeforeCount;
