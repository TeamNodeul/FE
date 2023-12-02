import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addRoutine, data } from "../../DB/DB_Routine";
import { userID } from "../../DB/userID";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import { RootStackParam } from "./Routine";
const MakeRoutine = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState([
    { id: "", name: "", sets: "", reps: "", weight: "" },
  ]);

  const exerciseItems = [
    { label: "어이 운동을 선택해라.", name: "", id: "" },
    { label: "[하체] 스쿼트", name: "스쿼트", id: "100" },
    { label: "[하체] 레그프레스", name: "레그프레스", id: "101" },
    { label: "[하체] 레그컬", name: "레그컬", id: "102" },
    { label: "[하체] 레그익스텐션", name: "레그익스텐션", id: "103" },

    { label: "[가슴] 벤치프레스", name: "벤치프레스", id: "200" },
    { label: "[가슴] 덤벨컬", name: "덤벨컬", id: "201" },
    { label: "[가슴] 숄더프레스", name: "숄더프레스", id: "202" },
    { label: "[가슴] 체스트프레스", name: "체스트프레스", id: "203" },

    { label: "[등] 데드리프트", name: "데드리프트", id: "300" },
    { label: "[등] 덤벨로우", name: "덤벨로우", id: "301" },
    { label: "[등] 바벨로우", name: "바벨로우", id: "302" },
    { label: "[등] 시티드로우", name: "시티드로우", id: "303" },
    { label: "[등] 랫풀다운", name: "랫풀다운", id: "303" },
  ];

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { id: "", name: "", sets: "", reps: "", weight: "" },
    ]);
  };

  const handleRemoveExercise = (indexToRemove: number) => {
    const updatedExercises = exercises.filter(
      (_, index) => index !== indexToRemove
    );
    setExercises(updatedExercises);
  };

  const handleCreateRoutine = () => {
    // console.log("Routine Name:", routineName);
    // console.log("Exercises:", exercises);
    const d = new Date();

    const newRoutine = {
      id: 1 + data[data.length - 1].id,
      user_id: userID,
      name: routineName,
      date: "" + d.getFullYear() + (d.getMonth() + 1) + d.getDate(),
      exercises: [] as {}[], //object타입의 리스트
    };
    exercises.map((item) => {
      const addExercise = {
        id: item.id,
        name: item.name,
        sets: Number(item.sets),
        reps: Number(item.reps),
        weight: Number(item.weight),
      };

      newRoutine.exercises.push(addExercise);
    });

    addRoutine(newRoutine);
    // console.log(data[data.length-1]);
    // data.map((item)=>{console.log(item)});

    navigation.pop();
  };

  interface Exercise {
    id: string;
    name: string;
    sets: string;
    reps: string;
    weight: string;
    [key: string]: string; // 인덱스 시그니처 추가
  }
  //  const InputDataBox = ({value, onChangeText} : {value:string; onChangeText:(param:string)=>void}) =>{
  //     return(
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.inputLabel}>세트 수</Text>
  //         <TextInput
  //         // autoFocus={true}
  //         keyboardType="numeric" // 숫자 키패드를 띄우기 위한 설정
  //           style={styles.input}
  //           value={value}
  //           onChangeText={onChangeText}
  //           placeholder="0"
  //         />
  //     </View>
  //     );
  //   };

  return (
    <View style={styles.container}>
      <View style={{ height: hp(95) }}>
        <View style={{ marginHorizontal: "5%", marginTop: "10%" }}>
          <Text style={styles.label}>루틴 이름</Text>
          <TextInput
            style={styles.input}
            value={routineName}
            onChangeText={(text) => setRoutineName(text)}
            placeholder="루틴 이름"
          />
          <View style={styles.separater}></View>
        </View>

        {/* <Text style={styles.label}>운동 종목</Text> */}
        <ScrollView style={{ padding: "5%" }}>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseLabel}>운동 종목 이름</Text>

                <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                  <View
                    style={{ width: "80%", borderWidth: 1, borderRadius: 10 }}
                  >
                    <Picker
                      style={styles.exerciseInput}
                      selectedValue={exercise.name}
                      onValueChange={(itemValue) => {
                        const updatedExercises = [...exercises];
                        updatedExercises[index].name = itemValue;
                        setExercises(updatedExercises);
                      }}
                    >
                      {exerciseItems.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={item.label}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveExercise(index)}
                    >
                      <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.setsRepsVolumeContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>세트 수</Text>
                  <TextInput
                    keyboardType="numeric" // 숫자 키패드를 띄우기 위한 설정
                    returnKeyType="next"
                    style={styles.input}
                    value={exercise.sets.toString()}
                    onChangeText={(text) => {
                      const updatedExercises = [...exercises];
                      updatedExercises[index].sets = text;
                      setExercises(updatedExercises);
                    }}
                    // onSubmitEditing={()=>{nextInput.current.focus()}}
                    placeholder="0세트"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>회</Text>
                  <TextInput
                    keyboardType="numeric" // 숫자 키패드를 띄우기 위한 설정
                    style={styles.input}
                    value={exercise.reps.toString()}
                    onChangeText={(text) => {
                      const updatedExercises = [...exercises];
                      updatedExercises[index].reps = text;
                      setExercises(updatedExercises);
                    }}
                    placeholder="0"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>kg</Text>
                  <TextInput
                    keyboardType="numeric" // 숫자 키패드를 띄우기 위한 설정
                    style={styles.input}
                    value={exercise.weight.toString()}
                    onChangeText={(text) => {
                      const updatedExercises = [...exercises];
                      updatedExercises[index].weight = text;
                      setExercises(updatedExercises);
                    }}
                    placeholder="0"
                  />
                </View>
              </View>
              {/* <View style={styles.separater}></View> */}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExercise}
          >
            <Text style={styles.addButtonText}>운동 종목 추가</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateRoutine}
        >
          <Text style={styles.createButtonText}>루틴 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 1,
    // justifyContent:"flex-end",
    // alignItems:"center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    // marginTop: 12,
    // padding:"5%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    textAlign: "center",
  },
  exerciseInput: {
    flex: 7.5,
    // width:"85%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
    // backgroundColor:"gray",
    backgroundColor: "#dee2e6",
    padding: 10,
    // marginBottom: hp(2),
    borderRadius: 20,
    // width: wp(90),
  },
  exerciseHeader: {
    // flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  exerciseLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  setsRepsVolumeContainer: {
    flexDirection: "row",
    // justifyContent: "sp",
    // wi
    // padding:10
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    alignSelf: "center",
  },
  removeButton: {
    backgroundColor: "gray",
    // padding: 20,
    height: 50,
    width: 50,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    // color: "red",
    color: "skyblue",
    fontSize: 30,
    fontWeight: "bold",
    // marginTop: 5,
  },
  addButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    // marginTop: 20,
    marginVertical: "10%",
    marginBottom: "50%",
    alignItems: "center",
  },
  addButtonText: {
    color: "skyblue",
    fontSize: 16,
    fontWeight: "bold",
  },

  createButton: {
    flex: 1,
    backgroundColor: "skyblue",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 1,

    alignItems: "center",

    // alignSelf: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  separater: {
    // marginTop: 20,
    // width: "90%",
    height: 1,
    backgroundColor: "black",
  },
});

export default MakeRoutine;
