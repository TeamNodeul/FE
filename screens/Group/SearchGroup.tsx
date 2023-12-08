import React, {useEffect, useState} from "react";
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
import axios from "axios";
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
  // const [groupList, setGroupList] = useState({} as {teamId:number, teamName:string, memberNum:number, presentMemberNum:number, headName:string, "avgWorkoutTime":number, "avgVolume":number});
  const [groupList, setGroupList] = useState([] as {teamId:number, teamName:string, memberNum:number, presentMemberNum:number, headName:string, "avgWorkoutTime":number, "avgVolume":number}[]);
  //모든
  
  // const [myGroup, setMyGroup] = useState({} as {"headId": number, "headName": string, "memberNum": number, "presentMemberNum": number, "teamId": number, "teamName": string, "avgWorkoutTime":number, "avgVolume":number});
  const [userTeamInfo, setUserTeamInfo] = useState([] as {teamId:number, teamName:string, memberNum:number, presentMemberNum:number, headName:string, "avgWorkoutTime":number, "avgVolume":number}[]); //내가 가입한 그룹 들
  const [group, setGroup] = useState({} as {teamId:number, teamName:string, memberNum:number, presentMemberNum:number, headName:string, "avgWorkoutTime":number, "avgVolume":number}); //모달에서 보는 그룹
  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log("모든그룹 불러오기")
        const allGroup = await axios.get(
          `http://3.36.228.245:8080/api/teams/find-all/team-list`
        );
        const userTeamInfo = await axios.get(`http://3.36.228.245:8080/api/teams/find-all/${userID}`);
        setUserTeamInfo(userTeamInfo.data.data);
        // const teamPower = await axios.get(`http://3.36.228.245:8080/api/teams/find/${groupList.teamId}`);
          // console.log(teamPower.data.data);
        // console.log(response.data);
        // console.log(response.data.data);
        // setGroupList({...response.data.data, avgWorkoutTime : teamPower.data.data.avgWorkoutTime, avgVolume : teamPower.data.data.avgVolume});
        setGroupList(allGroup.data.data);
        // setGroupList(response)
        // apiGroupData = response.data.data;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userID]);

  

  const closeModal = ()=>{
    setIsModalVisible(false);
  }

  
  const GroupInfo = ()=>{

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
            <Text style={{fontSize:wp(6), fontWeight:"bold"}}> {group.teamName} </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.modalContent}>
            <Text>그룹장 : {group.headName}</Text>
            <Text>멤버 수 : {group.presentMemberNum}/{group.memberNum} 명</Text>
            <Text>평균 운동시간: {group.avgWorkoutTime ? group.avgWorkoutTime.toFixed(1) : group.avgWorkoutTime}분</Text>
            <Text>평균 무게량: {group.avgVolume ? group.avgVolume.toFixed(1) : group.avgVolume}KG</Text>
          </View>
          
          <TouchableOpacity style={{width:wp(70), alignItems:"center", borderWidth:2, borderColor:"skyblue", borderRadius:20, padding:10}}
          onPress={()=>{
            if(userTeamInfo.some(item=>item.teamId === group.teamId)){
              Alert.alert("이미 가입했잖아!!!!!!!!");
            }
            else{
              const fetchData = async () => {
                try {
                  console.log(group.teamId, userID);
                  await axios.post(`http://3.36.228.245:8080/api/members/add/${group.teamId}/${userID}`);
                  // console.log(response.data.data);
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              };
              
              fetchData()
              .then(()=>navigation.goBack())
              .catch(err=>console.log(err));
              addMyGroup(groupList);
              console.log("그룹가입");

            }
          }}>
            <Text style={{fontSize:wp(5), fontWeight:"bold"}}>그룹 가입</Text>
          </TouchableOpacity>
        </View>
        
      </Modal>
    )
  }
  
  const GroupButton = ({ item, index }: { item: {teamId:number, teamName:string, memberNum:number, presentMemberNum:number, headName:string, avgWorkoutTime:number, avgVolume:number}, index: number }) => {
    // console.log(item);

    return (
      <TouchableOpacity
      onPress={() => {
        setIsModalVisible(!isModalVisible);
        const selectedGroup = {
          teamId:item.teamId, 
          teamName:item.teamName, 
          presentMemberNum:item.presentMemberNum, 
          memberNum:item.memberNum, 
          headName:item.headName,
          avgWorkoutTime:item.avgWorkoutTime,
          avgVolume:item.avgVolume
        }
        console.log(item);
        setGroup(selectedGroup);
      return false;
      }}
      >
        <View style={[styles.box, item.headName == "xx" ? {borderWidth:3} : null]}>
          <Text style={styles.name}>{item.teamName}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.count}>{item.presentMemberNum}/{item.memberNum}명</Text>
            <Text style={styles.leader}>그룹장: {item.headName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const GroupList = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {groupList.map((item, index) => {
          
          return(
          <GroupButton key={item.teamId} item={item} index={item.teamId} />
        )})}
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
