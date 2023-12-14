import React, { useState, useRef, useEffect, LegacyRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  // AsyncStorage,
} from "react-native";
import axios from "axios";
import { themeColor } from "../Home/Home";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
// export let userName = "";
// export let welcomeTo = "";

//현재 로그인 된 유저 id 저장
import { userID, Login } from "../../DB/userID";
import User from "../../DB/DB_User";

import UserData from "../../DB/DB_User";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyPage = () => {
  // 현재 로그인된 유저 객체를 가져옴
  // const user = UserData.find((user) => user.id === userID);
  const [user, setUser] = useState({} as {id:number, name:string, gender:string, height:number, weight:number});
  const [userProfile, setUserProfile] = useState({ weight: 0, height: 0 });
  const [userReport, setUserReport] = useState({
    totalTime: 0,
    totalWeight: 0,
  });

  // const [userName, setUserName] = useState(user!.name);
  // const [welcomeTo, setUserEmail] = useState(user!.email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!userID) return;
        const response = await axios.get(
          `http://3.36.228.245:8080/api/users/find/${userID}`
        );
        setUser(response.data.data);
        console.log("유저정보:",response.data.data);

        setUserProfile({
          height: response.data.data.height,
          weight: response.data.data.weight,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!userID) return;
        const response = await axios.get(
          `http://3.36.228.245:8080/api/histories/last-seven-days/${userID}`
        );
        let totalSumTime = 0;
        let totalSumWeight = 0;

        response.data.forEach((item: any) => {
          totalSumTime += item.totalTime;
          totalSumWeight += item.totalWeight;
        });

        setUserReport({
          totalTime: totalSumTime,
          totalWeight: totalSumWeight,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userID]);

  const userName = user?.name;
  const welcomeTo = "불나방 세계에 오신 것을 환영합니다.";
  /**화면 focus될시 강제 렌더링 */
  const [, updateState] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // console.log("마에페이지 포커스")
      // Do something when the screen is focused
      updateState([]);
    }, [])
  );

  // useEffect(() => {
  //   // 핫 리로드를 위해, userID가 바뀌었으면 마이페이지 정보도 갱신해줌
  //   setUserName(user!.name);
  //   setUserEmail(user!.email);
  // }, [userID]);

  const [modalVisible, setModalVisible] = useState(false);
  // const [inputText, setInputText] = useState("");
  let inputText: string = "";

  const inputRef = useRef<any>();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTextChange = (text: any) => {
    // setInputText(text);
    inputText = text;
  };

  // const saveText = () => {
  //   //userName = inputText;
  //   setUserName(inputText);
  //   closeModal();
  // };
  const tryLogin = () => {
    Login(Number(inputText));
    closeModal();
  };

  const NameModifier = () => {
    useEffect(() => {
      if (modalVisible && inputRef.current) {
        inputRef.current.focus();
      }
    }, [modalVisible]);

    return (
      <Modal
        // animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>로그인할 id 입력: </Text>
          <TextInput
            ref={inputRef}
            keyboardType="numeric"
            placeholder="로그인할 id 입력"
            onChangeText={handleTextChange}
            onSubmitEditing={tryLogin}
            // value={inputText}
            style={{
              backgroundColor: "lightgrey",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: "3%",
            }}
          />
          <View style={styles.modalButtonStyle}>
            <View style={{ marginHorizontal: "5%" }}>
              {/* <Button title="로그인" onPress={saveText} /> */}
              <Button title="로그인" onPress={tryLogin} />
            </View>
            <View style={{ marginHorizontal: "5%" }}>
              <Button title="닫기" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const DataContainer = () => {
    return (
      <View style={styles.dataContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.dataTypeText}>신체 데이터</Text>
          <View style={styles.physicalData}>
            <FontAwesome5 name="weight" size={wp(7)} color="black" />
            <Text style={{ fontSize: wp(4), marginLeft: wp(2) }}>
              몸무게 : {userProfile.weight} kg
            </Text>
            <MaterialCommunityIcons
              name="human-male-height"
              size={wp(7)}
              color="black"
              style={{ marginLeft: wp(5) }}
            />
            <Text style={{ fontSize: wp(4), marginLeft: wp(2) }}>
              키 : {userProfile.height} cm
            </Text>
          </View>
          <Text style={styles.dataTypeText}>운동 리포트</Text>
          <View style={styles.reportData}>
            <Text style={{ fontSize: wp(5) }}>
              이번 주 총 운동 시간: {userReport.totalTime}분
            </Text>
            <Text style={{ fontSize: wp(5), marginTop: hp(2) }}>
              이번 주 소화한 총 무게: {userReport.totalWeight}kg
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}></View>
        <View style={[{ flex: 2 }, styles.profileTextContainer]}>
          <FontAwesome name="user-circle" size={54} color="black" />
        </View>
        <View style={[styles.profileTextContainer, { flex: 1 }]}>
          <Text style={[styles.profileText, { fontWeight: "bold" }]}>
            {userName} 님
          </Text>

          <NameModifier />

          <TouchableOpacity>
            <AntDesign
              style={{ marginLeft: 5 }}
              name="login"
              size={24}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.profileTextContainer, { flex: 1 }]}>
          <Text>{welcomeTo}</Text>
        </View>
      </View>
      {/* <Login/> */}
      <View style={styles.line}></View>
      <DataContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    flex: 1.5,
  },
  dataContainer: {
    flex: 3.5,
    marginHorizontal: "5%",
    marginVertical: "5%",
  },
  line: {
    marginTop: 10,
    width: "80%",
    height: 1,
    backgroundColor: "#dee2e6",
  },
  scrollPage: {},
  rightIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  profileTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  profileText: {
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonStyle: {
    flexDirection: "row",
    marginTop: "3%",
  },

  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  physicalData: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(3),
    paddingLeft: wp(10),
    width: wp(90),
    height: hp(10),
    marginTop: hp(1),
    marginBottom: hp(5),
    borderColor: themeColor,
    borderWidth: wp(0.5),
    borderRadius: 20,
    flexDirection: "row",
  },
  reportData: {
    width: wp(90),
    height: hp(14),
    marginVertical: hp(1),
    paddingVertical: hp(2),
    borderColor: themeColor,
    borderWidth: wp(0.5),
    borderRadius: 20,
    alignItems: "center",
  },
  dataTypeText: {
    fontSize: wp(5),
    color: "#495057",
  },
});

export default MyPage;
