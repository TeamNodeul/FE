# Front-End
### 사용 언어
- JavaScript(TypeScript)
### 기술스택
- Node.js 20.9.0 (for npm)
- TypeScript
- React Native 0.72
- react-native-ble-plx 3.1.2 (블루투스 Low Energy)
- EXPO cli SDK 49
- EAS(Expo Application Services)
- VisualStudioCode
- Android Studio(for Build and Emulator)





## 리액트 구조
### App.tsx
- ### Home Stack
- - Home.tsx
- - BeforeCount.tsx
- - NFCScreen.tsx
- - AutoMeasure.tsx  -->(호출) useBLE.tsx
- - TakingBreak.tsx
- - ManualMeasure.tsx
- - RoutineBottomSheet.tsx
- ### Diet Stack
- - Diet.tsx
- - CreateDietManual.tsx
- - DietByGPT.tsx
- - PostDiet2PGT.tsx
- ### Routine Stack
- - Routine.tsx
- - AboutRoutine.tsx
- - MakeRoutine.tsx
- - RoutineByGPT.tsx
- - Post2GPT.tsx
- ### Group Stack
- - Group.tsx
- - AboutGroup.tsx
- - SearchGroup.tsx
- - GroupSetting.tsx
- ### MyPage Stack
- - Mypage.tsx