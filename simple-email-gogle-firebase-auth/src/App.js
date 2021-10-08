import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import initializeAutherntication from "./firebase/firebase.initialize";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

initializeAutherntication();
const gogleProvider = new GoogleAuthProvider();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const auth = getAuth();

  // gogle sign in
  const handleSignIn = () => {
    signInWithPopup(auth, gogleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => console.log(error));
  };
  const handleToggle = (e) => {
    setIsLogging(e.target.checked);
  };
  // name blur
  const handlNameBlur = (event) => {
    setName(event.target.value);
  };
  // password blur
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  // email blur
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  // email submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // password length check
    if (password.length < 8) {
      setError("Password Must be at least 8 characters long.");
    }
    // password uppercase check
    else if (!/(?=.*?[A-Z])/.test(password)) {
      setError("Password Must be at least 1 Uppercase.");
    }
    // password 1 digit check
    else if (!/(?=.*?[0-9])/.test(password)) {
      setError("Password Must be at least 1 digit.");
    }
    // password sppecial character check
    else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password Must be At least one special character.");
    }
    // when done
    else {
      if (isLogging) {
        signInWithEmailAndPassword(auth, email, password)
          .then((result) => {
            setError("");
            setFirebaseError("");
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            setFirebaseError(error.message);
          });
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            setError("");
            setFirebaseError("");
            verfiyEmail();
            setUserName();
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
            setFirebaseError(error.message);
          });
      }
    }
  };
  const verfiyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  // update profile
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {
      console.log(result);
    });
  };
  return (
    <div>
      <h3 className="text-danger pb-4 pt-5 text-center">
        {isLogging ? "Please Log In " : "Please Sign Up"}
      </h3>
      <form onSubmit={handleSubmit}>
        {isLogging === false && (
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handlNameBlur}
                type="name"
                className="form-control"
                id="inputEmail3"
                required
              />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              onBlur={handleEmailBlur}
              type="email"
              className="form-control"
              id="inputEmail3"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onBlur={handlePasswordBlur}
              type="password"
              className="form-control"
              id="inputPassword3"
              required
            />
            <div id="emailHelp" className="form-text text-danger">
              {error}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                onChange={handleToggle}
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Register
              </label>
            </div>
          </div>
        </div>
        <p className="text-center py-3">{firebaseError}</p>

        <button type="submit" className="btn btn-primary">
          {isLogging === true ? "Sign in" : "Sign Up"}
        </button>
      </form>
      <hr />
      <div className="text-center">
        <button className="btn btn-danger" onClick={handleSignIn}>
          Gogle Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
