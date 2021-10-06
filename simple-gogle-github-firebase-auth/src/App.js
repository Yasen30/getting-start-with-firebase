import { useState } from "react";
import initializeAuthentication from "./firebase/firebaseInitialize";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import "./App.css";

initializeAuthentication();

const gogleProvider = new GoogleAuthProvider();
const gthubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGogleSignIn = () => {
    signInWithPopup(auth, gogleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        const errorMessge = error.message;
        console.log(errorMessge);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, gthubProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          photo: photoURL,
          email: email,
        };
        setUser(loggedInUser);
      })
      .catch((error) => console.log(error));
  };
  const handleGogleSignOut = () => {
    signOut(auth)
      .then((result) => setUser({}))
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      {user.name ? (
        <div>
          <button onClick={handleGogleSignOut}>Gogle Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGithubSignIn}>Git Sign in </button>
          <button onClick={handleGogleSignIn}>Gogle Sign In</button>
        </div>
      )}
      {user.name && (
        <div>
          <h1>Welcome to {user.name}</h1>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
