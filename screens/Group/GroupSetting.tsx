import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";
import { themeColor } from "../Home/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { addGroup } from "../../DB/DB_Group";
import { groupData, addGroup, myGroupData, addMyGroup } from "../../DB/DB_Group";
import { userID } from "../../DB/userID";
import UserData from "../../DB/DB_User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export type RootStackParam = {
  Group: undefined;
  GroupSetting: undefined;
};

let idNum = 9;

const GroupSetting = () => {
  // const [group, setGroup] = useState({} as {memberNum:number, teamName:string});




  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [category, setCategory] = useState("카테고리"); //카테고리, 인원수
  const [number, setNumber] = useState("number");

  const [inputName, setInputName] = useState(""); //그룹 이름, 그룹 설명
  const [inputDescription, setInputDescription] = useState("");

  const handleNameInputChange = (text: string) => {
    setInputName(text);
  };

  const handleDescriptionInputChange = (text: string) => {
    setInputDescription(text);
  };

  const handleDoneButtonPress = () => {
    //그룹 이름과 설명 입력 후 완료 버튼 눌렀을 때
    // 받아오기 성공, 서버로 넘겨주는것 구현만 하면 됨
    //alert(inputName + " " + inputDescription + " " + category + " " + number);
    const user = UserData.find((user) => user.id === userID);
    console.log(user!.name);

    console.log(
      "Group Created : ",
      inputName,
      category,
      number,
      inputDescription
    );

    const newGroup = {
      id: groupData.length,
      name: inputName,
      headCount: "1/" + number,
      leader: user!.name,
    };

    addGroup(newGroup);
    addMyGroup(newGroup);

    setCategory("");
    setNumber("");
    setInputName("");
    setInputDescription("");

    const fetchData = async () => {
      try {
        const response = await axios.post(`http://3.36.228.245:8080/api/teams/create/${userID}`,
          {memberNum: number, teamName:inputName}
        );
        
        // console.log(response.data.data);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then(()=>{
      navigation.goBack();
      navigation.goBack();
    }) 

    // navigation.pop();
    //setter(inputName, number, user!.name);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <View style={{ flex: 0.7 }}></View>
      <View style={{ flex: 0.5 }}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => navigation.pop()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 11 }}>
        <Text
          style={{ fontSize: wp(6), fontWeight: "bold", textAlign: "center" }}
        >
          그룹 만들기
        </Text>
        <View style={{ marginTop: hp(2) }}>
          <TextInput
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
              borderRadius: wp(3),
            }}
            placeholder="그룹 이름"
            onChangeText={handleNameInputChange}
            value={inputName}
          />
        </View>
        {/* <View style={{ marginTop: hp(2) }}>
          <TextInput
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
              borderRadius: wp(3),
            }}
            placeholder="어떤 그룹인지 설명해주세요. (가입 규칙 또는 응원 문구)"
            onChangeText={handleDescriptionInputChange}
            value={inputDescription}
          />
        </View> */}
        {/* <View
          style={{
            marginTop: hp(5),
            borderWidth: wp(0.2),
            borderColor: "gray",
            borderRadius: wp(3),
            overflow: "hidden",
          }}
        >
          
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          >
            <Picker.Item label="카테고리" value="" />
            <Picker.Item label="헬스" value="health" />
            <Picker.Item label="스포츠" value="sports" />
            <Picker.Item label="런닝" value="running" />
            <Picker.Item label="근성장" value="muscleGrowth" />
          </Picker>
        </View> */}
        <View
          style={{
            marginTop: hp(2),
            borderWidth: wp(0.2),
            borderColor: "gray",
            borderRadius: wp(3),
            overflow: "hidden",
          }}
        >
          {/* Assuming you are using a picker library for the dropdown */}
          {/* Replace this with the appropriate component */}
          <Picker
            selectedValue={number}
            onValueChange={(itemValue, itemIndex) => setNumber(itemValue)}
          >
            <Picker.Item label="모집인원 선택" value="" />
            <Picker.Item label="2명" value="2" />
            <Picker.Item label="3명" value="3" />
            <Picker.Item label="4명" value="4" />
            <Picker.Item label="5명" value="5" />
            <Picker.Item label="6명" value="6" />
            <Picker.Item label="7명" value="7" />
            <Picker.Item label="8명" value="8" />
            <Picker.Item label="9명" value="9" />
            <Picker.Item label="10명" value="10" />
          </Picker>
        </View>
        <View style={{ marginTop: hp(5) }}>
          <TouchableOpacity
            style={{
              backgroundColor: themeColor,
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={handleDoneButtonPress}
          >
            <Text style={{ color: "white" }}>완료</Text>
          </TouchableOpacity>
        </View>
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
