import React from "react";
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

const AboutGroup = ({ route }: any) => {
  const { groupId } = route.params;
  const groupInfo = groupData.find((item) => item.id === groupId);

  if (!groupInfo) {
    return (
      <View>
        <Text>해당 그룹을 찾을 수 없음</Text>
      </View>
    );
  }

  const TeamMembers = () => {
    const members = [
      { id: 1, name: "류지원" },
      { id: 2, name: "강현민" },
      { id: 3, name: "오소리" },
      { id: 4, name: "멤버4" },
      { id: 5, name: "멤버5" },
      { id: 6, name: "멤버6" },
      { id: 7, name: "멤버7" },
      // 추가 팀원 데이터...
    ];

    return (
      <View style={styles.membersContainer}>
        {members.map((member) => (
          <View key={member.id} style={[styles.member, 
            member.name===User[userID].name ? {borderWidth:2, borderColor:"skyblue"} : null,
            member.name===groupInfo.leader ? {borderWidth:2, borderBlockStartColor:"black"} : null,
          ]}>
            <Text>{member.name}</Text>
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
            {groupInfo.name}{" "}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.headContent}>
          <Text style={{ fontSize: 16 }}>그룹장 : {groupInfo.leader}</Text>
          <Text style={{ fontSize: 16 }}>멤버 수 : {groupInfo.headCount} 명</Text>
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
  },
  member: {
    // borderWidth:2,
    width: "48%", // 3명씩 표시하려면 전체 너비의 1/3 정도로 설정
    height: "55%",
    marginBottom: hp(2),
    padding: 10,
    backgroundColor: "white",
    borderColor:"white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default AboutGroup;
