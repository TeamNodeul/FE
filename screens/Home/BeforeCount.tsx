import * as React from "react";
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
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { themeColor } from "./Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export type RootStackParam = {
  NFCScreen: undefined;
  AutoMeasure: undefined;
  ManualMeasure: undefined;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const buttonWidth = windowWidth * 0.9;

const DATA = [
  { timestamp: Date.now(), text: "Sample Text" },
  { timestamp: Date.now() + 1, text: "Sample Text 2" },
];

const BeforeCount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [text, setText] = React.useState("");
  const [data, setData] = React.useState(DATA);

  const handleDelete = (timestamp) => {
    const res = data.filter((item) => item.timestamp !== timestamp);
    setData([...res]);
  };

  const handleAdd = () => {
    const res = { timestamp: Date.now(), text: text };
    setData([...data, res]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: wp(90),
          height: wp(90) / 4,
          backgroundColor: "#FFF",
          marginHorizontal: wp(5),
          marginBottom: hp(2),
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: hp(4),
            height: hp(4),
            backgroundColor: themeColor,
            borderRadius: 4,
            marginHorizontal: wp(5),
            opacity: 0.4,
          }}
        />
        <Text style={{ width: wp(57) }}>{item.text}</Text>
        <View
          style={{
            width: hp(2),
            height: hp(2),
            backgroundColor: themeColor,
            borderRadius: 100,
            marginHorizontal: wp(3),
          }}
        />
      </View>
    );
  };

  const renderHiddenItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
        }}
      >
        <Pressable onPress={null}>
          <Text style={{ fontSize: hp(3) }}>✒️</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>🗑️</Text>
        </Pressable>
      </View>
    );
  };

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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, { width: buttonWidth }]}
          onPress={() => alert("운동 루틴을 불러옵니다")} //구현 예정
        >
          <Text style={styles.ButtonText}>운동 루틴 불러오기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <SwipeListView
          data={data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={wp(10)}
          rightOpenValue={-wp(10)}
        />
        <View style={{ width: wp(100), height: hp(10), flexDirection: "row" }}>
          <TextInput
            placeholder="please write the text."
            value={text}
            placeholderTextColor="#aaa"
            onChangeText={(item) => setText(item)}
            style={{
              width: wp(60),
              marginLeft: wp(13),
              backgroundColor: "#FFF",
              height: hp(5),
              paddingLeft: wp(3),
              borderRadius: 10,
            }}
          />
          <Pressable
            style={{
              width: hp(5),
              height: hp(5),
              marginLeft: wp(3),
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
            onPress={handleAdd}
          >
            <Text>➕</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { width: buttonWidth, marginVertical: "3%" },
          ]}
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
});

export default BeforeCount;
