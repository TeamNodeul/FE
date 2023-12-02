import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  FlatList,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import data from "../DB/DB_ExerciseList";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Fontisto } from "@expo/vector-icons";

const BottomSheet = (props: any) => {
  const { modalVisible, setModalVisible, id } = props;
  const exerciseData = data.find((entry) => entry.id === id);
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  if (!exerciseData) {
    return (
      <View>
        <Text>{id}에 해당하는 데이터가 없습니다.</Text>
      </View>
    );
  }

  const exercises = exerciseData.exercises;

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Fontisto name="minus-a" size={wp(10)} color="grey" style={{}} />
          </View>
          <View
            style={{
              marginTop: hp(2),
              alignItems: "center",
              justifyContent: "center",
            }}
            key={id}
          >
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "bold",
                marginBottom: hp(5),
              }}
            >
              이날의 운동 기록
            </Text>
            <FlatList
              data={exercises}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.exerciseText}>
                    {item.name} - {item.sets}세트, {item.reps}회, {item.weight}
                    kg
                  </Text>
                  <View style={styles.line}></View>
                </View>
              )}
            ></FlatList>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: hp(60),
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
  },
  line: {
    marginVertical: hp(2),
    width: wp(90),
    height: 1,
    backgroundColor: "#dee2e6",
  },
  exerciseText: {
    fontSize: wp(4),
  },
});

export default BottomSheet;
