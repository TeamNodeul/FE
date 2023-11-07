import React, {useState} from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
} from "react-native";

import { themeColor } from "./Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


const GPTButton = () => {
  return (
      <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonText}>GPT루틴 추천</Text>
    </TouchableOpacity>
  );
};


const Routine = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <GPTButton/>
      </View>
      <View style={styles.container}>
        <GPTButton/>
      </View>
      <View style={styles.container}>
        <GPTButton/>
      </View>
      
    </View>
    
  );
};
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "f8f9fa",
    marginTop: 30,
    marginRight: 20,
  },
  buttonContainer: {
    width: windowWidth * 0.4,
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
});



export default Routine;
