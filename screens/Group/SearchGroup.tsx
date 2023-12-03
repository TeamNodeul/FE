import React, {useState} from "react";
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
  Modal,
  TouchableWithoutFeedback
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
import {groupData, myGroupData, addMyGroup } from "../../DB/DB_Group";
import { userID } from "../../DB/userID";
import User from "../../DB/DB_User";
export type RootStackParam = {
  Group: undefined;
  SearchGroup: undefined;
  GroupSetting: undefined;
  AboutGroup: { groupId: number };
};

const Group = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  //구현 예정
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [group, setGroup] = useState({"id":0, "name":"", "headCount":"", "leader":""});
  const closeModal = ()=>{
    setIsModalVisible(false);
  }

  const GroupInfo = ()=>{
    // console.log("zdasd");
    return(
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPressIn={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={{margin:hp(1),  borderWidth:0}}>
            <Text style={{fontSize:wp(6), fontWeight:"bold"}}> {group.name} </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.modalContent}>
            <Text>그룹장 : {group.leader}</Text>
            <Text>멤버 수 : {group.headCount} 명</Text>
            <Text>Body 영역</Text>
          </View>
          
          <TouchableOpacity style={{width:wp(70), alignItems:"center", borderWidth:2, borderColor:"skyblue", borderRadius:20, padding:10}}
          onPress={()=>{
            // console.log(myGroupData);
            // console.log(group.id);
            // console.log(myGroupData.some(item=>item.id===group.id));
            if(myGroupData.some(item=>item.id===group.id)){
              Alert.alert("이미 가입했잖아!!!!!!!!");
            }
            else{
              addMyGroup(group);
              console.log("그룹가입");

            }

            navigation.goBack();
          }}>
            <Text style={{fontSize:wp(5), fontWeight:"bold"}}>그룹 가입</Text>
          </TouchableOpacity>
        </View>
        
      </Modal>
    )
  }
  
  const GroupButton = ({ item, index }: { item: any; index: number }) => {
    // console.log(item);
    return (
      <TouchableOpacity
      onPress={() => {
        setIsModalVisible(!isModalVisible);
        const selectedGroup = {
          "id":item.id,
          "name":item.name,
          "headCount":item.headCount,
          "leader":item.leader,
        }
        setGroup(selectedGroup);
      // navigation.navigate("AboutGroup", { groupId: item.id });
      return false;
      }}
      >
        <View style={[styles.box, item.leader===User[userID].name ? {borderWidth:3} : null]}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.count}>{item.headCount}명</Text>
            <Text style={styles.leader}>그룹장: {item.leader}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const GroupList = () => {
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParam>>();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {groupData.map((item, index) => (
          <GroupButton key={item.id} item={item} index={item.id} />
        ))}
      </ScrollView>
    );
  };

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
            // marginLeft: wp(5),
            textAlign: "center",
          }}
        >
          그룹 찾기
        </Text>
        {/* <TouchableOpacity>
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
        </TouchableOpacity> */}
        <GroupInfo/>
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GroupList />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("GroupSetting");
          }}
        >
          <AntDesign name="pluscircle" size={90} color={themeColor} />
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
    borderColor:"skyblue"
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
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position:"absolute",
    width:"90%",
    height:"50%",
    bottom:"25%",
    alignSelf:"center",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
    // borderWidth:1,
    borderRadius:20,
  },
  modalContent: {
    // borderRadius:50,
    width: '100%',
    height: "60%", // 화면의 절반 크기
    backgroundColor: 'white',
    padding: 20,
    // borderWidth:1,
  },
});

export default Group;
