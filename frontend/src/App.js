import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3003";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [PIN, setPIN] = useState("");
  return (
    <div>
      {isLoggedIn ? (
        <h1>Your PIN is: {PIN}</h1>
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} setPIN={setPIN} />
      )}
    </div>
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
        props.setPIN(res.data.pin);
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
