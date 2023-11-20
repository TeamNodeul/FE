import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export type RootStackParam = {
  Group: undefined;
  GroupSetting: undefined;
};

const data = [
  {
    name: "운동을 하고 싶어서 만든 방",
    headCount: "12/20명",
    leader: "강현민",
  },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
  { name: "불나방", headCount: "10/20명", leader: "오소리" },
];

const GroupComponent = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item, index) => (
        <View style={styles.box} key={index}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.count}>{item.headCount}</Text>
            <Text style={styles.leader}>그룹장: {item.leader}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const Group = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  //구현 예정
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            marginTop: hp(3),
            marginLeft: wp(5),
            textAlign: "center",
          }}
        >
          내가 가입한 그룹
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="notifications"
            size={hp(3)}
            color="black"
            style={{
              marginTop: hp(3),
              position: "relative",
              right: -wp(25),
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GroupComponent />

        <TouchableOpacity
          onPressOut={() => {
            navigation.navigate("GroupSetting");
          }}
        >
          <View>
            <AntDesign
              name="pluscircle"
              size={wp(15)}
              color={themeColor}
              style={{
                position: "absolute",
                bottom: hp(2),
                left: wp(30),
                shadowColor: "black",
                shadowOffset: {
                  width: 10,
                  height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "f8f9fa",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#dee2e6",
    justifyContent: "center",
    marginBottom: hp(2),
  },
  box: {
    backgroundColor: "#dee2e6",
    padding: 16,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
  },
  name: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginBottom: wp(2),
    color: "#343a40",
  },
  count: {
    fontSize: wp(3.5),
    color: "#495057",
  },
  leader: {
    fontSize: wp(3.5),
    marginLeft: wp(5),
    color: "#495057",
  },
});

export default Group;