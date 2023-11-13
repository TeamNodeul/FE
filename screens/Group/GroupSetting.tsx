import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const GroupSetting = () => {
  const [category, setCategory] = useState("카테고리");

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        그룹 만들기
      </Text>
      <View style={{ marginTop: 12 }}>
        <TextInput
          style={{ borderColor: "gray", borderWidth: 1, padding: 8 }}
          placeholder="그룹 이름"
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <TextInput
          style={{ borderColor: "gray", borderWidth: 1, padding: 8 }}
          placeholder="어떤 그룹인지 설명해주세요. (가입 규칙 또는 응원 문구)"
        />
      </View>
      <View style={{ marginTop: 12 }}>
        {/* Assuming you are using a picker library for the dropdown */}
        {/* Replace this with the appropriate component */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="category" value="" />
          <Picker.Item label="Cardiology" value="cardiology" />
          <Picker.Item label="Neurology" value="neurology" />
          <Picker.Item label="Pediatrics" value="pediatrics" />
          <Picker.Item label="Psychiatry" value="psychiatry" />
        </Picker>
      </View>
      <View style={{ marginTop: 12 }}>
        <TouchableOpacity
          style={{
            backgroundColor: themeColor,
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  //구현 예정
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "f8f9fa",
  },
});

export default GroupSetting;
