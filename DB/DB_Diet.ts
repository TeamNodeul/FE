import React, { useState } from "react";

export const options = { weekday: "long" };
export const initDate = new Date(); //월, 일이 0일부터 시작됨
export const lastDate = new Date(initDate);

// initDate.setFullYear(2023);
// initDate.setMonth(10);
// initDate.setDate(27);
export const initMonth = initDate.getMonth() + 1;
export const initDat = initDate.getDate();

const day = [];

let arrDayStr = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

for (let i = 0; i < 7; i++) {
  if (i) lastDate.setDate(lastDate.getDate() + 1);
  day.push(
    `${lastDate.getMonth() + 1}월 ${lastDate.getDate()}일 ${
      arrDayStr[lastDate.getDay()]
    }`
  );
}

export const dietData = [
  {
    index: 1,
    day: day[0],
    breakfast: "오트밀과 사과",
    lunch: "치킨 샐러드",
    dinner: "연어 스테이크",
  },
  {
    index: 2,
    day: day[1],
    breakfast: "스크램블 에그",
    lunch: "야채 스프",
    dinner: "스테이크와 구운 야채",
  },
  {
    index: 3,
    day: day[2],
    breakfast: "단백질 쉐이크",
    lunch: "치킨랩",
    dinner: "새우튀김",
  },
  {
    index: 4,
    day: day[3],
    breakfast: "아보카도 토스트",
    lunch: "퀴노아 샐러드",
    dinner: "팬에 구운 두부",
  },
  {
    index: 5,
    day: day[4],
    breakfast: "요거트와 그래놀라",
    lunch: "그릴드 치킨",
    dinner: "야채 카레 덮밥",
  },
  {
    index: 6,
    day: day[5],
    breakfast: "팬케이크",
    lunch: "시저 샐러드",
    dinner: "연어 스테이크",
  },
  {
    index: 7,
    day: day[6],
    breakfast: "와플",
    lunch: "채소볶음밥",
    dinner: "그릴된 치킨과 샐러드",
  },
];

/* const DB_Diet = () => {
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const getDaysOfWeek = () => {
    const selectedDate = new Date(initDate);

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + i);
      const dayOfWeek = nextDate.toLocaleDateString(undefined, {
        weekday: "long",
      });
      daysOfWeek.push(dayOfWeek);
    }

    setResult(daysOfWeek);
  };

  setStartDate(day[0]);
  getDaysOfWeek();
}; */

//export default DB_Diet;
