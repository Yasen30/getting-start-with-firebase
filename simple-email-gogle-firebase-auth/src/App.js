import logo from "./logo.svg";
import "./App.css";
import initializeAutherntication from "./firebase/firebase.initialize";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

initializeAutherntication();
const gogleProvider = new GoogleAuthProvider();
function App() {
  const auth = getAuth();
  const handleSignIn = () => {
    signInWithPopup(auth, gogleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <button onClick={handleSignIn}>Gogle Sign In</button>
    </div>
  );
}

export default App;
