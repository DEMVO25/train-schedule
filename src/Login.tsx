import React, { MouseEventHandler, useEffect } from "react";
import Register from "./Register";
import { useNavigate } from "react-router";
import './login.css'

interface LoginProps {
  children: React.ReactElement;
  username: string;
  setUsername: (value: string) => void;
}

enum DialogType {
  Register = "Register",
}

function Login({ username, setUsername, children }: LoginProps) {
  const navigate = useNavigate();
  const [usernameForm, setUsernameForm] = React.useState("");
  const [passwordForm, setPasswordForm] = React.useState("");
  const [currDialogType, setCurrDialogType] = React.useState("");

  useEffect(() => {
    const validateJWT = async () => {
      const res = await fetch("/verifyjwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.authenticated) {
        console.log(data);
        setUsername(data.username);
      } else {
        alert(data.message);
      }
    };

    const token = localStorage.getItem("jwt-token");
    if (token) {
      validateJWT();
    }
  }, []);

  const loginHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const jwt = async () => {
      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameForm,
            password: passwordForm,
          }),
        });
        const data = await res.json();
        if (data.message === "success") {
          localStorage.setItem("jwt-token", data.token);
          setUsername(data.username);
          navigate("/");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    await jwt();
  };

  const closeDialog = () => {
    setCurrDialogType("");
  };

  const handleCurrDialogType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrDialogType(event.currentTarget.name);
  };

  if (username) {
    return children;
  }

  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          value={usernameForm}
          onChange={(e) => setUsernameForm(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={passwordForm}
          onChange={(e) => setPasswordForm(e.target.value)}
          placeholder="Password"
        />
        <button type="button" onClick={loginHandle}>
          Login
        </button>
        <button
          name={DialogType.Register}
          onClick={handleCurrDialogType}
          className="register-button"
        >
          Register
        </button>
      </div>
    </div>
    <Register
      open={currDialogType === DialogType.Register}
      closeForm={closeDialog}
    />
  </>
  );
}
export default Login;
