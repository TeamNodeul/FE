import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { userID } from '../../DB/userID';

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from 'axios';
import { RootStackParam } from './Routine';

type Post2GPTProps = {
  route: {
    params: {
      selectedOptions: string[]; // 실제 타입은 이에 맞게 수정
    };
  };
  // 나머지 스크린의 프로퍼티들...
};


const Post2GPT = ({route} : any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  // const {userId} = route.params.userId;
  const {selectedOptions} = route.params;
  console.log(selectedOptions);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const userInfo = await axios.get(`http://3.36.228.245:8080/api/users/find/${userID}`);
        const {gender, height, weight} = userInfo.data.data;
        console.log(userInfo.data.data);

        const response = await axios.post(`http://3.36.228.245:8080/api/sportRoutines/create/${userID}/random-routine`,
          {
            "userGender": gender ==="남성" ? true : false,
            "userHeight": height,
            "userLevel": selectedOptions[2] ==="적당히" ? 1 : 2,
            "userWeight": weight
          }
          );
          
          // console.log(routineId);
          console.log(response.data);
          navigation.goBack();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  // const {selectedOptions} = route.params.selectedOptions;
  return (
    <View style={styles.container}>
        <Image source={require("../../assets/loading.gif")} />
      <View style={{backgroundColor:"skyblue", borderRadius:100}}>

      </View>
      <Text style={styles.text}>GPT에게 보낼 선택 정보들: </Text>
      <View>
        {
          selectedOptions.map((item:string, index:number)=>
            <Text key={index} style={{fontSize:18}}>{index + ". " + item}</Text>
          )
        }
      </View>
      
      
      {/* <Text style={styles.text}>{selectedOptions[1]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: "30%",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: 'blue',
    // alignSelf: "flex-start"
  },
});

export default Post2GPT;
