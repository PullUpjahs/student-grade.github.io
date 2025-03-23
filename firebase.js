// Firebase SDK 설정 및 초기화
const firebaseConfig = {
  apiKey: "AIzaSyDWQ7Qs50KEuNzcmWShEc_8iBYnx_Kkmz8",
  authDomain: "pull-up-6504e.firebaseapp.com",
  databaseURL: "https://pull-up-6504e-default-rtdb.firebaseio.com",
  projectId: "pull-up-6504e",
  storageBucket: "pull-up-6504e.firebasestorage.app",
  messagingSenderId: "862460549940",
  appId: "1:862460549940:web:f5b25f0dd599b7dcbfa361",
  measurementId: "G-9YHPGFC48P"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
