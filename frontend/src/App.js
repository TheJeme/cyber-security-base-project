import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3003";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(false);
  const [PIN, setPIN] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/api/users")
        .then((res) => {
          res.data.forEach((user) => {
            if (user.username === username) {
              setPIN(user.pin);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, username]);
  return (
    <>
      {isLoggedIn ? (
        <h1>Your PIN is: {PIN}</h1>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
      )}
    </>
  );
}

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onsubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        username: `${username}`,
        password: `${password}`,
      })
      .then((res) => {
        props.setUsername(res.data.username);
        props.setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onsubmit(e)}>
        <div>
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default App;
