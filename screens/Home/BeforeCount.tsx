import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  Alert,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

import { data } from "../../DB/DB_Routine";

import { SwipeListView } from "react-native-swipe-list-view";
import Routine from "../Routine/Routine";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { themeColor } from "./Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import RoutineBottomSheet from "./RoutineBottomSheet";
import { exerciseId } from "./RoutineBottomSheet"; //선택한 루틴의 id
import RoutineData from "../../DB/DB_Routine";

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

  const [, updateState] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      updateState([]);
    }, [])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };

  const [routineNumber, setRoutineNumber] = useState();

  const routineData = data.find((entry) => entry.id === exerciseId);
  const routines = routineData?.exercises;

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

  const RoutineList = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {routineData?.exercises.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>
              {item.reps}회 | {item.sets}세트 | {item.weight}kg
            </Text>
          </View>
        ))}
      </ScrollView>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={pressButton} //구현 예정
        >
          <Text style={{ color: "white", fontSize: wp(5), marginLeft: wp(2) }}>
            나만의 루틴
          </Text>
          <AntDesign
            name="right"
            size={wp(6)}
            color="white"
            style={{ marginLeft: wp(75), marginTop: -hp(1) }}
          />
          <Text
            style={{
              color: "white",
              fontSize: wp(3),
              marginTop: hp(0),
              marginLeft: wp(2),
              marginBottom: hp(1),
            }}
          >
            루틴을 선택해주세요.
          </Text>
        </TouchableOpacity>
        <RoutineBottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={{ marginTop: hp(5) }}>
          <RoutineList />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => navigation.navigate("AutoMeasure")}
        >
          <Text style={styles.ButtonText}>블루투스 연동해서 측정하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttonStyle, { width: buttonWidth }]}>
          <Text
            style={styles.ButtonText}
            onPress={() => handleManualButtonPress()}
          >
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
    width: "100%",
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
  box: {
    //backgroundColor: "#dee2e6",
    padding: 16,
    marginVertical: hp(1),
    borderRadius: wp(5),
    width: wp(90),
    marginLeft: wp(5),
    borderColor: "skyblue",
    borderWidth: 2,
  },
  itemName: {
    fontSize: wp(4.3),
    fontWeight: "600",
    marginBottom: hp(0.5),
  },
});

export default BeforeCount;
