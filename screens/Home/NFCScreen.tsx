import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  PermissionsAndroid,
  Button,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

export type RootStackParam = {
  NFCScreen: undefined;
};

const SERVICE_UUID = "369f109d-f77e-48f4-8f36-8ec381c6abf2";
const COUNT_UUID = "52923a50-8dcc-4452-a92b-d3245c7f6652";
const PHASE_UUID = "921a82c4-02cc-4665-acc5-a979ace621f2";

const NFCScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>(); //navigation

  //const { requestPermissions } = useBLE();

  const handleBackPress = () => {
    navigation.pop();

    return true;
  };

  // const openModal = async () => {
  //   requestPermissions((isGranted: boolean) => {
  //     alert("The Android Permission is granted? " + isGranted);
  //   });
  // };

  //NFC 파트
  // async function readNdef() {
  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const tag = await NfcManager.getTag();
  //     setCount(count + 1);
  //     console.warn("Tag found", tag);
  //   } catch (ex) {
  //     console.warn("Oops!", ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // }
  // 구현중
  const [count, setCount] = useState(1);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}></View>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={styles.leftIcon}
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => navigation.pop()}
          />
          <Feather
            style={styles.rightIcon}
            name="home"
            size={30}
            color="black"
            onPress={() => navigation.popToTop()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.image}>
        <Image
          source={require("../../assets/image/NFC.png")}
          style={styles.imageSize}
        />
      </View>
      <Text style={styles.textStyle}>
        운동기구에 핸드폰을 태그하세요! NFC 카운트 횟수 : {count}
      </Text>
      <TouchableOpacity style={{ width: "90%" }}>
        <Text>연결</Text>
      </TouchableOpacity>
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
  textStyle: {
    flex: 1,
    fontSize: 24,
  },
  image: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageSize: {
    height: 300,
    width: 300,
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
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
});

export default NFCScreen;
