/*import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! Made By KHM</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
} from "react-native";

import BleManager from "react-native-ble-manager";
import { Colors } from "react-native/Libraries/NewAppScreen";

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    //start bluetooth manager
    BleManager.start({ showAlert: false }).then(() => {
      console.log("BleManager initialized");
    });
  }, []);

  useEffect(() => {
    //turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log("Blutooth is turned on!");
    });

    if (Platform.OS === "android" && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    let stopListener = BleManagerEmitter.addListener(
      "BleManagerStopScan",
      () => {
        setIsScanning(false);
        console.log("스캔 중지");
      }
    );
  }, []);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log("스캔중...");
          setIsScanning(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                color: isDarkMode ? Colors.white : Colors.black,
              }}
            >
              불나방 by TeamNodeul
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}
          >
            <Text style={styles.buttonTextStyle}>
              {isScanning ? "Scanning..." : "Scan Bluetooth Devices"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#CCCCCC",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
export default App;

/*export default function App() {
  const isLoading = true;
  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <Text>Hello JSX World!</Text>
    </SafeAreaView>
  );
}*/
