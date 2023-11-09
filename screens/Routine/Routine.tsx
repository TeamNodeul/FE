import React, {useState} from "react";
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

import { themeColor } from "../Home";
import { useNavigation, } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  //makeRoutine: undefined;
};


const data = [
  { name: '사용자 1', exerciseRecord: '운동 기록 1', bodySpec: '신체 스펙 1' },
  { name: '사용자 2', exerciseRecord: '운동 기록 2', bodySpec: '신체 스펙 2' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
  { name: '사용자 3', exerciseRecord: '운동 기록 3', bodySpec: '신체 스펙 3' },
];

const MyComponent = () => {
  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.box} key={index}>
          <Text style={styles.name}>{item.name}</Text>
           <Text style={styles.record}>{item.exerciseRecord}</Text>
          <Text style={styles.spec}>{item.bodySpec}</Text>
        </View>
      ))}
    </ScrollView>
  );
};





const GPTButton = () => {
  /* navigation은 같은 함수내에 존재해야함*/
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>(); 
  return (
      <TouchableOpacity style={styles.buttonContainer} onPress ={()=>{navigation.navigate("RoutineByGPT")}}>
      <Text style={styles.buttonText}>GPT루틴 추천</Text>
    </TouchableOpacity>
  );
};


const Routine = () => {
  
  return (
    <View style={styles.container} >
      <View style={{flex: 2, backgroundColor: "skyblue"}}>
        <View style={styles.gptButton}>
          <GPTButton/>
        </View>

      </View>
      <View style={styles.separator}></View>
        <View style={{flex: 9}}>
      
          <MyComponent />
        {/* <View style={styles.container}>
          <GPTButton/>
        </View> */}
      </View>
    </View>
    
  );
};
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  gptButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "f8f9fa",
    marginTop: 30,
    marginRight: 20,
  },
  buttonContainer: {
    width: 130,
    marginTop: 20,
    backgroundColor: "white",
    borderColor: themeColor,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 15,
    alignItems:"center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: themeColor,
    //width: 200,
    //height: 50,
    marginRight: 20, // 우측 상단에 여백 추가
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "black", // 가로선의 색상 (예: 회색)
    marginTop: 0, // 가로선 위 여백
    marginBottom: 20, // 가로선 아래 여백
  },



  box: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  record: {
    fontSize: 16,
  },
  spec: {
    fontSize: 16,
  },



});



export default Routine;
