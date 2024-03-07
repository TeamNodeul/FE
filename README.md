# Front-End
![image](https://github.com/TeamNodeul/FE/assets/69042677/1740d784-6d22-4ef5-bf1a-c278176f68e5)

### 디자인 초안(Figma)
- https://www.figma.com/file/ZlaG5Eh77d1hPy5TPWi0CP/Team_Nodeul?type=whiteboard&node-id=0-1

# 최종 디자인(메뉴얼)
![image](https://github.com/TeamNodeul/FE/assets/69042677/ec1eaaa3-e000-4d47-b250-e6a095ce0e52)
- ### 최종 디자인(메뉴얼 포함) LINK : https://drive.google.com/file/d/1fRyR2btuEOqlDKptYxZFCw7XxOHC5JRX/view

### 기술스택
- ### TypeScript(JavaScript)
- Node.js 20.9.0 (for npm)

- React Native 0.72
- EXPO cli SDK 49
- EAS(Expo Application Services)
- react-native-ble-plx 3.1.2 (블루투스 Low Energy)
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
