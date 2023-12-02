export const data = [
  {
    id: 1,
    user_id: 1,
    name: "하체왕 되는 루틴",
    part: "하체",
    date: "2023년9월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 80 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 100 },
      { id: 3, name: "레그 프레스", sets: 3, reps: 12, weight: 120 },
      { id: 4, name: "레그 컬", sets: 3, reps: 15, weight: 40 },
    ],
  },

  {
    id: 10,
    user_id: 1,
    name: "3분할운동",
    part: "하체 가슴 등",
    date: "2023년10월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 90 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 110 },
      { id: 3, name: "벤치프레스", sets: 3, reps: 12, weight: 70 },
      { id: 4, name: "덤벨 플라이", sets: 3, reps: 15, weight: 20 },
      { id: 4, name: "덤벨 플라이", sets: 3, reps: 15, weight: 20 },
      { id: 4, name: "덤벨 플라이", sets: 3, reps: 15, weight: 20 },
      { id: 4, name: "덤벨 플라이", sets: 3, reps: 15, weight: 20 },
    ],
  },
  {
    id: 20,
    user_id: 1,
    name: "2분할",
    part: "하체 가슴 등 어깨",
    date: "2023년11월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 85 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 110 },
      { id: 3, name: "숄더프레스", sets: 3, reps: 12, weight: 50 },
      { id: 4, name: "사이드 레터럴 레이즈", sets: 3, reps: 15, weight: 15 },
    ],
  },
  {
    id: 40,
    user_id: 1,
    name: "내가 만든 루틴4",
    part: "하체",
    date: "2023년12월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 75 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 95 },
      { id: 3, name: "레그 익스텐션", sets: 3, reps: 12, weight: 60 },
      { id: 4, name: "좌우 레그 컬", sets: 3, reps: 15, weight: 30 },
    ],
  },
  {
    id: 100,
    user_id: 2,
    name: "내가 만든 루틴5",
    part: "하체",
    date: "2023년11월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 85 },
      { id: 3, name: "벤치프레스", sets: 3, reps: 12, weight: 75 },
      { id: 4, name: "숄더프레스", sets: 3, reps: 12, weight: 55 },
      { id: 5, name: "덤벨 루인", sets: 3, reps: 15, weight: 25 },
    ],
  },
  {
    id: 110,
    user_id: 2,
    name: "새로운 루틴1",
    part: "상체",
    date: "2023년12월20일",
    exercises: [
      { id: 1, name: "벤치프레스", sets: 4, reps: 10, weight: 80 },
      { id: 2, name: "로우 로우", sets: 3, reps: 12, weight: 90 },
      { id: 3, name: "덤벨 숄더프레스", sets: 3, reps: 12, weight: 40 },
      { id: 4, name: "바벨 컬", sets: 3, reps: 15, weight: 30 },
    ],
  },
  {
    id: 200,
    user_id: 3,
    name: "새로운 루틴2",
    part: "상체",
    date: "2023년12월25일",
    exercises: [
      { id: 1, name: "덤벨 프레스", sets: 4, reps: 10, weight: 70 },
      { id: 2, name: "친업", sets: 3, reps: 12, weight: 0 },
      { id: 3, name: "케이블 푸시 다운", sets: 3, reps: 12, weight: 50 },
      { id: 4, name: "덤벨 컬", sets: 3, reps: 15, weight: 25 },
    ],
  },
  {
    id: 201,
    user_id: 1,
    name: "하체왕 되는 루틴",
    part: "하체",
    date: "2023년9월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 80 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 100 },
      { id: 3, name: "레그 프레스", sets: 3, reps: 12, weight: 120 },
      { id: 4, name: "레그 컬", sets: 3, reps: 15, weight: 40 },
    ],
  },
  {
    id: 202,
    user_id: 1,
    name: "하체왕 되는 루틴",
    part: "하체",
    date: "2023년9월13일",
    exercises: [
      { id: 1, name: "스쿼트", sets: 4, reps: 10, weight: 80 },
      { id: 2, name: "데드리프트", sets: 3, reps: 12, weight: 100 },
      { id: 3, name: "레그 프레스", sets: 3, reps: 12, weight: 120 },
      { id: 4, name: "레그 컬", sets: 3, reps: 15, weight: 40 },
    ],
  },
];

// interface newRoutine{
//   id : number,
//   user_id : number,
//   name : string,
//   date : Date,
//   exercises : [{
//     id:number,
//     name:string,
//     sets:number,
//     reps:number,
//     weight:number,
//   }]
// }
export const addRoutine = (newRoutine: any) => {
  data.push(newRoutine);
};

export default data;
