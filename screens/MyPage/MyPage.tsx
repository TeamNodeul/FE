import React, { useState, useRef, useEffect } from "react";
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
import { themeColor } from "../Home/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
// export let userName = "";
// export let userEmail = "";

//현재 로그인 된 유저 id 저장
import { userID } from "../../DB/userID";

import UserData from "../../DB/DB_User";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyPage = () => {
  // 현재 로그인된 유저 객체를 가져옴
  const user = UserData.find((user) => user.id === userID);
  const [userName, setUserName] = useState(user!.name);
  const [userEmail, setUserEmail] = useState(user!.email);

  useEffect(() => {
    // 핫 리로드를 위해, userID가 바뀌었으면 마이페이지 정보도 갱신해줌
    setUserName(user!.name);
    setUserEmail(user!.email);
  }, [userID]);

  // const Login = ()=>{

  //   const handleLogin = async ()=>{
  //     const user = UserData.find((user)=>user.id === userID);

  //     if(user){
  //       const token:number = user.id;

  //       try{
  //         await AsyncStorage.setItem('token', token.toString());
  //         // navigation
  //         // setUserId(user.id.toString());
  //         // userId = user.id;
  //         setUserName(user.name);
  //         setUserEmail(user.email);

  //       } catch(error){
  //         console.error('Error saving token:', error);
  //       }
  //     }
  //     // User.find()
  //   }

  //   return (
  // <View style={[styles.container, {flexDirection: 'row',width:100}]}>
  //   <TextInput
  //     style={styles.input}
  //     placeholder="id"
  //     // value={userId.toString()}

  //     // onChangeText={(text)=>{userId = parseInt(text)}}
  //     keyboardType="numeric"
  //   />
  //   <Button title="Login" onPress={handleLogin}/>

  // </View>

  //   )
  // }

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTextChange = (text: any) => {
    setInputText(text);
  };

  const saveText = () => {
    //userName = inputText;
    setUserName(inputText);
    closeModal();
  };

  const NameModifier = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>변경할 프로필 이름을 입력하세요: </Text>
          <TextInput
            placeholder="변경할 이름 입력"
            onChangeText={setInputText}
            style={{
              backgroundColor: "lightgrey",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: "3%",
            }}
          />
          <View style={styles.modalButtonStyle}>
            <View style={{ marginHorizontal: "5%" }}>
              <Button title="저장" onPress={saveText} />
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
            <ScrollView>
              <Text></Text>
            </ScrollView>
          </View>
          <Text style={styles.dataTypeText}>운동 리포트</Text>
          <View style={styles.reportData}></View>
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
              name="edit"
              size={24}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.profileTextContainer, { flex: 1 }]}>
          <Text>{userEmail}</Text>
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
    paddingVertical: hp(1),
    width: wp(90),
    height: hp(30),
    marginTop: hp(1),
    marginBottom: hp(5),
    borderColor: themeColor,
    borderWidth: wp(0.5),
    borderRadius: 20,
  },
  reportData: {
    width: wp(90),
    height: hp(30),
    marginVertical: hp(1),
    borderColor: themeColor,
    borderWidth: wp(0.5),
    borderRadius: 20,
  },
  dataTypeText: {
    fontSize: wp(5),
    color: "#495057",
  },
});

export default MyPage;
