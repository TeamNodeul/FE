import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import User from "../../DB/DB_User";
import { userID } from "../../DB/userID";
import { themeColor } from "../Home/Home";
import { groupData } from "../../DB/DB_Group";
import axios from "axios";

const AboutGroup = ({ route }: any) => {
  const { groupId } = route.params;
  // const groupInfo = groupData.find((item) => item.id === groupId);
  const [members, setMembers] = useState([] as {id:number, name:string, totalTime:number}[]);
  const [groupInfo, setGroupInfo] = useState({} as {headName:string, teamName:string, memberNum:number, presentMemberNum:number})
  if (!groupId) {
    return (
      <View>
        <Text>해당 그룹을 찾을 수 없음</Text>
      </View>
    );
  }
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.36.228.245:8080/api/teams/${groupId}/members-list`);
        console.log(response.data.data);
        const aboutTeam = await axios.get(`http://3.36.228.245:8080/api/teams/find/${groupId}`);
        setGroupInfo(aboutTeam.data.data);
        // setGroupList(response.data.data);
        setMembers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();    

  },[userID])
  const TeamMembers = () => {
    
    return (
      <View style={styles.membersContainer}>
        {members.map((member) => (
          <View key={member.id} style={[styles.member, 
            member.name===User[userID].name ? {borderWidth:2, borderColor:"skyblue"} : null,
            member.name===groupInfo.headName? {borderWidth:2, borderBlockStartColor:"black"} : null,
          ]}>
            <Text style={{fontWeight:"bold", marginBottom:30}}>{member.name}</Text>
            <Text>이번주 총 운동 시간</Text>
            <Text style={{fontWeight:"bold",fontSize:35}}>{member.totalTime}분</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: hp(2),
            marginBottom: hp(1),
            textAlign: "center",
          }}
        >
          그룹 정보
        </Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.head}>
        <View style={{ margin: hp(0), borderWidth: 0 }}>
          <Text style={{ fontSize: wp(6), fontWeight: "bold" }}>
            {" "}
            {groupInfo.teamName}{" "}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.headContent}>
          <Text style={{ fontSize: 16 }}>그룹장 : {groupInfo.headName}</Text>
          <Text style={{ fontSize: 16 }}>멤버 수 : {groupInfo.presentMemberNum}/{groupInfo.memberNum} 명</Text>
        </View>
      </View>
      {/* <View style={styles.line}></View> */}
      <View style={styles.body}>
        <TeamMembers />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    height: "9%",
    justifyContent: "flex-end",
  },
  box: {
    backgroundColor: "#d0ebff",
    padding: 16,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
  },
  head: {
    // borderWidth: 1,
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "grey",
    padding: 5,
    borderRadius: 5,
    marginBottom: "5%",
  },
  headContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: "5%",
    backgroundColor: "white",
    // borderWidth: 1,
  },
  body: {
    flex: 6,
    width: "90%",
    alignSelf: "center",
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginBottom: "5%",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#dee2e6",
    margin: "2%",
  },
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    height:"30%",
  },
  member: {
    // borderWidth:2,
    width: "48%", // 3명씩 표시하려면 전체 너비의 1/3 정도로 설정
    height: "100%",
    marginBottom: hp(2),
    padding: 10,
    backgroundColor: "white",
    borderColor:"white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default AboutGroup;
