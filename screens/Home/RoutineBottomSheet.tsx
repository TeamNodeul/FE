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
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import RoutineData from "../../DB/DB_Routine";
import { userID } from "../../DB/userID";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Fontisto } from "@expo/vector-icons";

export let exerciseId = -1;

const RoutineBottomSheet = (props: any) => {
  const { modalVisible, setModalVisible } = props;
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

  const MyRoutineList = RoutineData.filter((item) => item.user_id === userID);

  const handleRoutineClick = (id: number) => {
    console.log(id);
    exerciseId = id;
    setModalVisible(false);
  };

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
              marginTop: hp(3),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: wp(5),
                fontWeight: "bold",
                marginBottom: hp(3),
              }}
            >
              루틴 선택
            </Text>
            <View>
              <ScrollView>
                {MyRoutineList.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.box}
                    onPress={() => {
                      handleRoutineClick(item.id);
                    }}
                  >
                    <View>
                      <Text style={styles.name}>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>{item.part}</Text>
                        <Text>{item.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
    height: hp(70),
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
    color: "#343a40",
  },
});

export default RoutineBottomSheet;
