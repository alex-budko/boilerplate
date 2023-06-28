import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAO195mxJXiiN0D7Focrs69Y0xggIK1qv4",
  authDomain: "boilerplate-ai.firebaseapp.com",
  projectId: "boilerplate-ai",
  storageBucket: "boilerplate-ai.appspot.com",
  messagingSenderId: "807926827527",
  appId: "1:807926827527:web:8f54a6fb08253ca3ddf8a2",
  measurementId: "G-EE8EENCLEP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);