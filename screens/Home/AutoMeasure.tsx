import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  BackHandler,
  Alert,
  Animated,
  Easing,
  PermissionsAndroid,
} from "react-native";
import { themeColor } from "./Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import NfcManager, { NfcTech } from 'react-native-nfc-manager';

import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import base64 from "react-native-base64";

export type RootStackParam = {
  NFCScreen: undefined;
  AutoMeasure: undefined;
  ManualMeasure: undefined;
  TakingBreak: undefined;
};

const SERVICE_UUID = "369f109d-f77e-48f4-8f36-8ec381c6abf2";
const COUNT_UUID = "52923a50-8dcc-4452-a92b-d3245c7f6652";
const PHASE_UUID = "921a82c4-02cc-4665-acc5-a979ace621f2";

const AutoMeasure = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


  // async function readNdef() {
  //   console.log("0");
  //   try {
  //     console.log("1");
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const tag = await NfcManager.getTag();
  //     console.log("2");
  //     // setNfcCount(Nfccount + 1);
  //     console.log("3");
  //     // console.log(Nfccount);
  //     console.log('Tag found', tag);

  //     // 이 부분에서 블루투스 연결 함수 호출
  //     await connectToDevice(device!);
  //     console.log("4")
  //   } catch (ex) {
  //     console.warn('Oops!', ex);
  //   } finally {
  //     // NfcManager.cancelTechnologyRequest();
  //   }
  // }




  const [count, setCount] = useState(0);
  const [manager, setManager] = useState<BleManager | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [realDevice, setRealDevice] = useState<Device>();
  const [state, setState] = useState("연결 안됨");

  const devices2: Device[] = [];

  const scaleValue = new Animated.Value(1);
  const resetThreshold = 3;

  useEffect(() => {
    const initializeBluetooth = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]).then((result) => {
          if (
            result["android.permission.ACCESS_FINE_LOCATION"] &&
            result["android.permission.BLUETOOTH_SCAN"] &&
            result["android.permission.BLUETOOTH_CONNECT"]
          ) {
            console.log("모든 권한 획득");
          } else {
            console.log("거절된 권한 있음");
          }
        });
      } catch (error) {
        console.error(error);
      }

      const bleManager = new BleManager();
      setManager(bleManager);

      // 이 부분에서 BLE 관련 이벤트 리스너를 설정하거나 초기화 작업을 수행할 수 있습니다.

      // 스캔을 시작합니다.

      bleManager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, scannedDevice) => {
          if (error) {
            console.error(error);
            return;
          }

          // 스캔된 디바이스를 처리합니다.
          if (scannedDevice?.name === "불나방") {
            // console.log(
            //   "Scanned device:",
            //   scannedDevice.id,
            //   scannedDevice.name
            // );
            devices2.push(scannedDevice);
            setDevices((prevDevices) => [...prevDevices, scannedDevice]);
            setRealDevice(scannedDevice);
          }
        }
      );
    };

    initializeBluetooth();

    //컴포넌트가 언마운트 될 때 스캔 중지 등의 정리 작업을 수행
    return () => {
      if (manager) {
        manager.stopDeviceScan();
      }
    };
  }, []); //한 번만 실행되도록 빈 배열 전달

  const countUp = () => {
    setCount((prevCount) => {
      console.log(prevCount + 1);
      return prevCount + 1;
    });
  };

  const connectToDevice = async (device: Device) => {
    if (manager === null) return;
    console.log("연결 시작");
    try {
      const deviceConnection = await manager.connectToDevice(device.id);
      console.log(0);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      setState("연결 성공!!");
      manager.stopDeviceScan();
      console.log(1);
      deviceConnection.monitorCharacteristicForService(
        SERVICE_UUID,
        COUNT_UUID,
        (err, characteristic) => {
          if (err) {
            console.log(err);
            return -1;
          } else if (!characteristic?.value) {
            console.log("데이터 받은게 없음");
            return -1;
          }
          const rawData = base64.decode(characteristic.value);
          console.log(rawData);
          // setCount(parseInt(rawData));
          //console.log(count);
          countUp();
          // setCount(count + 1);
        }
      );
      //console.log(12);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectToDevice = (device: Device) => {
    try {
      // 디바이스에 연결합니다.
      manager?.cancelDeviceConnection(device.id).then((connectedDevice) => {
        console.log("DisConnected to device:", connectedDevice.name);
      });

      // 연결된 디바이스와 상호 작용하는 코드를 추가할 수 있습니다.
    } catch (error) {
      console.error("Error connecting to device:", error);
    }
  };

  const handleAreYouDone = () => {
    Alert.alert(
      "운동 종료",
      "운동 측정을 종료하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            disconnectToDevice(realDevice!);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    //BackHandler.addEventListener("hardwareBackPress", handleAreYouDone);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleAreYouDone);
    };
  }, []);

  const StartAnimation = () => {
    if (count === resetThreshold - 1) {
      navigation.navigate("TakingBreak");
      setCount(0);
    } else {
      setCount(count + 1);
    }

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  function resetCount() {
    setCount(0);
  }

  useEffect(() => {
    const counting = () => {
      if (count === resetThreshold) {
        // setCount(0);
        resetCount();
        navigation.navigate("TakingBreak");
      }
    };

    counting();
  }, [count]);

  //구현 예정
  return (
    <View>
      <View style={styles.timeContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Text style={styles.countStyle}>{count}회</Text>
        </Animated.View>
      </View>
      <View style={styles.routineContainer}>
        {/* <Text>{realDevice!.name || "Unknown"}</Text> */}
        <Button title="Connect" onPress={() => connectToDevice(realDevice!)} />
        {/* <Button
          title="디스Connect"
          onPress={() => disconnectToDevice(realDevice!)}
        /> */}
        <Text style={{alignSelf:"center", fontSize:20, fontWeight:"bold"}}>{state}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAreYouDone}>
          <View style={styles.buttonStyle}>
            <Text>측정 종료</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    height: hp(50),
    backgroundColor: themeColor,
    alignItems: "center",
    justifyContent: "center",
  },
  countStyle: {
    fontSize: wp(30),
    color: "white",
  },
  routineContainer: {
    height: hp(35),
    backgroundColor: "white",
  },
  buttonContainer: {
    height: hp(10),
    backgroundColor: "white",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttonStyle: {
    width: wp(80),
    height: hp(5),
    borderWidth: wp(0.5),
    borderColor: "skyblue",
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AutoMeasure;
