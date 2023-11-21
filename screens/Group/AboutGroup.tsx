import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { data } from "./Group";

const AboutGroup = ({ route }: any) => {
  const { groupId } = route.params;
  const groupInfo = data.find((item) => item.id === groupId);

  if (!groupInfo) {
    return (
      <View>
        <Text>해당 그룹을 찾을 수 없음</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text>현재 선택한 그룹 : {groupId}번 그룹</Text>
        <Text>그룹 이름 : {groupInfo.name}</Text>
        <Text>그룹 인원수 : {groupInfo.headCount}명</Text>
        <Text>그룹 리더 : {groupInfo.leader}</Text>
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
  },

  box: {
    backgroundColor: "#d0ebff",
    padding: 16,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
  },

  name: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "#343a40",
  },
});

export default AboutGroup;
