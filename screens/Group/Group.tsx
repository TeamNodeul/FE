import React, { useState } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { myGroupData } from "../../DB/DB_Group";
// import { groupData as groupData } from "../../DB/DB_Group";
import { userID } from "../../DB/userID";
import User from "../../DB/DB_User";
// User[0].
export type RootStackParam = {
  Group: undefined;
  SearchGroup: undefined;
  GroupSetting: undefined;
  AboutGroup: { groupId: number };
};

const GroupButton = ({ item, index }: { item: any; index: number }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  // console.log(User[userID]);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AboutGroup", { groupId: item.id });
      }}
    >
      {/* 내가 생성한 그룹들은 하늘색 경계선이 생김 */}
      <View
        style={[
          styles.box,
          item.leader === User[userID].name ? { borderWidth: 3 } : null,
        ]}
        key={index}
      >
        <Text style={styles.name}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.count}>{item.headCount}명</Text>
          <Text style={styles.leader}>그룹장: {item.leader}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const GroupComponent = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {myGroupData.map((item, index) => (
        <GroupButton key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  );
};

const Group = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  //강제 렌더링
  const [, updateState] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      updateState([]);
    }, [])
  );

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
          style={styles.searchButton}
          onPress={() => {
            navigation.navigate("SearchGroup");
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
    backgroundColor: "#f8f9fa",
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
    borderColor: "skyblue",
    // borderWidth:1,
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
  searchButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});

export default Group;
