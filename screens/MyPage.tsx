import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
} from "react-native";
import { themeColor } from "./Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const MyPage = () => {
  //구현 예정
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <Feather
              style={styles.rightIcon}
              name="settings"
              size={28}
              color={themeColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, backgroundColor: "pink" }}></View>
        <View style={[styles.profileTextContainer, { flex: 1 }]}>
          <Text style={[styles.profileText, { fontWeight: "bold" }]}>
            오소리 님
          </Text>
          <TouchableOpacity>
            <AntDesign
              style={{ marginLeft: 5 }}
              name="edit"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.profileTextContainer,
            { flex: 1, backgroundColor: "pink" },
          ]}
        >
          <Text>maxkang0328@naver.com</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.dataContainer}>
        <Text>
          <ScrollView>
            <Text></Text>
          </ScrollView>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  profileContainer: {
    width: "100%",
    flex: 1.5,
  },
  dataContainer: {
    flex: 3.5,
  },
  line: {
    marginTop: 20,
    width: "90%",
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
});

export default MyPage;
