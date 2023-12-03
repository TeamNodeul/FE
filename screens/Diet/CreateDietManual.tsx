import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { themeColor } from "../Home/Home";
import axios from "axios";
import { userID } from "../../DB/userID";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//import Loading from "../../assets/image/loading.gif";

const CreateDietManual = () => {
  const [dietPlans, setDietPlans] = useState({
    Monday: { breakfast: "", lunch: "", dinner: "" },
    Tuesday: { breakfast: "", lunch: "", dinner: "" },
    Wednesday: { breakfast: "", lunch: "", dinner: "" },
    Thursday: { breakfast: "", lunch: "", dinner: "" },
    Friday: { breakfast: "", lunch: "", dinner: "" },
    Saturday: { breakfast: "", lunch: "", dinner: "" },
    Sunday: { breakfast: "", lunch: "", dinner: "" },
  });

  const handleInputChange = (day: any, meal: any, text: any) => {
    setDietPlans((prevState) => ({
      ...prevState,
      [day]: {
        ...(prevState[day] || {}),
        [meal]: text,
      },
    }));
  };

  const handleCreateDietPlan = () => {
    console.log("식단 계획:", dietPlans);
    //여기에서 dietPlans를 사용하여 원하는 작업 수행
  };
  const RenderDay = () => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text
            style={{
              marginTop: hp(3),
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            주간 식단 계획 만들기
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {[
              "월요일",
              "화요일",
              "수요일",
              "목요일",
              "금요일",
              "토요일",
              "일요일",
            ].map((day, index) => (
              <View key={index} style={{ width: "48%", marginBottom: 16 }}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {day}
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 8,
                      padding: 8,
                    }}
                    placeholder="아침"
                    keyboardType="default"
                    onChangeText={(text) =>
                      handleInputChange(day, "breakfast", text)
                    }
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 8,
                      padding: 8,
                    }}
                    placeholder="점심"
                    keyboardType="default"
                    onChangeText={(text) =>
                      handleInputChange(day, "lunch", text)
                    }
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      marginBottom: 8,
                      padding: 8,
                    }}
                    placeholder="저녁"
                    keyboardType="default"
                    onChangeText={(text) =>
                      handleInputChange(day, "dinner", text)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Button
              title="식단 계획 만들기"
              onPress={() => {
                handleCreateDietPlan();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <RenderDay />
    </View>
  );
};

function getDayColor(day: any) {
  return themeColor;
}

const styles = StyleSheet.create({});

export default CreateDietManual;
