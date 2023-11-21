import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  TextInput
} from "react-native";
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

import {userID} from "../DB/userID";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";



export type RootStackParam = {
  Routine: undefined;
  MakeRoutine: undefined;
  AboutRoutine: undefined;
  //
};

const MakeRoutine = () => {
  const addExercise = ()=>{


    return (
      <View>
        <TextInput
          style={styles.inputBox}
          placeholder="루틴이름"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="루틴이름"
        />
      </View>

    )
  }
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  //구현 예정
  return (
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      <View style={{flex:9, alignItems:"center"}}>
        <Text> 루틴 제작 페이지</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="루틴이름"
          />
          <TextInput
            style={styles.inputBox}
            placeholder="부위(part)"
          />
          <View style={styles.separator}></View>

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
    // paddingHorizontal: 16,
  },
  inputBox: {
    borderColor: "gray",
    borderWidth: 1,
    width: wp(90),
    padding: 15,
    borderRadius: 5,
    marginVertical:5,
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 0.5, // 가로선의 높이
    backgroundColor: "gray", // 가로선의 색상 (예: 회색)
    // marginTop: 0, // 가로선 위 여백
    //marginBottom: 20, // 가로선 아래 여백
    marginVertical:5,
  },

});

export default MakeRoutine;