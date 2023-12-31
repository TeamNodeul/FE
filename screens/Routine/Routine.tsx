import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { themeColor } from "../Home/Home";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RoutineByGPT from "./RoutineByGPT";
import AboutRoutine from "./AboutRoutine";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";


export type RootStackParam = {
  Routine: undefined;
  RoutineByGPT: undefined;
  AboutRoutine: { routineId: number };
  MakeRoutine: undefined;
};

import RoutineData from "../../DB/DB_Routine";
import { userID } from "../../DB/userID";
// import AsyncStorage from '@react-native-async-storage/async-storage';


const formattedDate = (timestamp:Date)=>{
  const date = new Date(timestamp);
  return (`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`);
}



const Routine = () => {
  // const MyRoutineList = RoutineData.filter((item) => item.user_id === userID);
  const [MyRoutineList, setMyRoutineList] = useState([] as {routineId:number, sportRoutineName:string, parts:string[], date:Date}[]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  /**화면 focus될시 강제 렌더링 */
  const [, updateState] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://3.36.228.245:8080/api/sportRoutines/find-all/${userID}/routine`);
          // console.log(response.data);

          setMyRoutineList(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();

      updateState([]);
    }, [])
  );



  const ShowRoutineList = () => {
    return (
      <View
        style={{
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {MyRoutineList.map((item, index) => 
        {
          return(
          <TouchableOpacity
            style={styles.box}
            key={item.routineId}
            onPress={() => {
              //showExerciseInfo();
              navigation.navigate("AboutRoutine", { routineId: item.routineId });
            }}
          >
            <View>
              <Text style={styles.name}>{item.sportRoutineName}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.part}>{item.parts.join(', ')}</Text>
                <Text style={styles.date}>{formattedDate(item.date)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )})}
      </View>
    );
  };

  const RoutineList = () => {
    return (
      <ScrollView style={styles.container}>
        <ShowRoutineList />
      </ScrollView>
    );
  };

  const GPTButton = () => {
    /* navigation은 같은 함수내에 존재해야함*/
    return (
      <TouchableOpacity
        style={styles.gptButtonContainer}
        onPress={() => {
          navigation.navigate("RoutineByGPT");
        }}
      >
        <Text style={styles.buttonText}>GPT에게 루틴 추천받기</Text>
      </TouchableOpacity>
    );
  };

  const MakeRoutineButton = () => {
    return (
      <TouchableOpacity
        style={styles.makeButton}
        onPress={() => {
          navigation.navigate("MakeRoutine");
        }}
      >
        <AntDesign name="pluscircle" size={90} color={"skyblue"} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: "100%", alignContent: "center" }}>
        <Text style={styles.title}>내가 만든 루틴 리스트</Text>
        <View style={styles.separator}></View>
        <GPTButton />
      </View>
      <View style={{ flex: 3 }}>
        <RoutineList />
        <MakeRoutineButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  gptButtonContainer: {
    marginTop: "4%",
    backgroundColor: "skyblue",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    color: "white",
  },
  separator: {
    width: "100%", // 화면 너비의 100%
    height: 1, // 가로선의 높이
    backgroundColor: "#dee2e6", // 가로선의 색상 (예: 회색)
    justifyContent: "center",
  },

  box: {
    backgroundColor: "#dee2e6",
    padding: 22,
    marginBottom: hp(2),
    borderRadius: 20,
    width: wp(90),
  },
  name: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginBottom: wp(1),
    color: "#343a40",
  },
  part: {
    fontSize: wp(3.5),
    color: "#495057",
  },
  date: {
    fontSize: wp(3.5),
    color: "#495057",
  },

  makeButton: {
    position: "absolute",
    // bottom: "5%",
    // right: "5%",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 100,
  },
  title: {
    alignSelf:"center",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: hp(7),
    marginBottom: hp(0.3),
    color: "#374151",
  },

  header: {
    flex: 0.5,
    width: "100%",
    padding: 20,
  },
  leftIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
});

export default Routine;
