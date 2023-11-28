// import { PermissionsAndroid, Platform } from "react-native";

// type PermissionCallback = (result: boolean) => void;

// interface BluetoothLowEnergyApi {
//   requestPermissions(callback: PermissionCallback): Promise<void>;
// }

// export default function useBLE(): BluetoothLowEnergyApi {
//   const requestPermissions = async (callback: PermissionCallback) => {
//     if (Platform.OS === "android") {
//       const grantedStaus = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Location Permission",
//           message: "Bluetooth Low Energy Needs Location Permission",
//           buttonNegative: "Cancel",
//           buttonPositive: "Ok",
//           buttonNeutral: "Maybe Later",
//         }
//       );
//       callback(grantedStaus === PermissionsAndroid.RESULTS.GRANTED);
//     } else {
//       callback(true);
//     }
//   };

//   return {
//     requestPermissions,
//   };
// }
