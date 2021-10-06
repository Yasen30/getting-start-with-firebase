import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAutherntication = () => {
  initializeApp(firebaseConfig);
};
export default initializeAutherntication;
