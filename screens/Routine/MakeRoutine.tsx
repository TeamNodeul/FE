import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MakeRoutine = () => {
  const navigation = useNavigation();
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "" }]);




  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);



  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
  };

  const handleRemoveExercise = (indexToRemove:number) => {
    const updatedExercises = exercises.filter((_, index) => index !== indexToRemove);
    setExercises(updatedExercises);
  };

  const handleCreateRoutine = () => {
    // 여기서 데이터베이스에 데이터를 전송하는 로직을 추가해야 합니다.
    // 현재는 콘솔에 출력하는 예시 코드만 작성했습니다.
    console.log("Routine Name:", routineName);
    console.log("Exercises:", exercises);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>루틴 이름</Text>
      <TextInput
        style={styles.input}
        value={routineName}
        onChangeText={(text) => setRoutineName(text)}
        placeholder="루틴 이름을 입력하세요"
      />

      <Text style={styles.label}>운동 종목</Text>
      <ScrollView>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseLabel}>운동 종목 이름</Text>
              <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
                <Text style={styles.removeButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={exercise.name}
              onChangeText={(text) => {
                const updatedExercises = [...exercises];
                updatedExercises[index].name = text;
                setExercises(updatedExercises);
              }}
              placeholder="운동 종목 이름을 입력하세요"
            />

            <View style={styles.setsRepsContainer}>
              <View style={styles.setsContainer}>
                <Text style={styles.setsRepsLabel}>세트 수</Text>
                <TextInput
                  style={styles.input}
                  value={exercise.sets}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].sets = text;
                    setExercises(updatedExercises);
                  }}
                  placeholder="세트 수를 입력하세요"
                />
              </View>

              <View style={styles.repsContainer}>
                <Text style={styles.setsRepsLabel}>운동 횟수</Text>
                <TextInput
                  style={styles.input}
                  value={exercise.reps}
                  onChangeText={(text) => {
                    const updatedExercises = [...exercises];
                    updatedExercises[index].reps = text;
                    setExercises(updatedExercises);
                  }}
                  placeholder="운동 횟수를 입력하세요"
                />
              </View>
            </View>
          </View>
        ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>운동 종목 추가</Text>
      </TouchableOpacity>
      </ScrollView>


      <TouchableOpacity style={styles.createButton} onPress={handleCreateRoutine}>
        <Text style={styles.createButtonText}>루틴 생성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exerciseLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  setsRepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setsContainer: {
    flex: 1,
    marginRight: 5,
  },
  repsContainer: {
    flex: 1,
    marginLeft: 5,
  },
  setsRepsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  removeButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    // width: wp(35),
    marginTop: "4%",
    // marginBottom: "3%",
    backgroundColor: "skyblue",
    // borderColor: "blue",
    // borderWidth: 1,
    // width:"100%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    // alignSelf: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MakeRoutine;
