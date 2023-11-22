import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Post2GPTProps = {
  route: {
    params: {
      selectedOptions: string[]; // 실제 타입은 이에 맞게 수정
    };
  };
  // 나머지 스크린의 프로퍼티들...
};

const Post2GPT = ({route} : any) => {
  // const {userId} = route.params.userId;
  const {selectedOptions} = route.params;

  // const {selectedOptions} = route.params.selectedOptions;
  return (
    <View style={styles.container}>
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
