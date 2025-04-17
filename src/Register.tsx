import React from "react";
import Dialog from "./components/dialog";
import "./register.css";

interface RegisterProps {
  open: boolean;
  closeForm: () => void;
}

function Register({ open, closeForm }: RegisterProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const registerHandle = async () => {
    if (!email || !username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    const data = await res.json();
    if (data.message === "Username already exists") {
      alert("Username already exists. Please choose a different username.");
    } else if (data.message === "User created successfully") {
      alert("User  created successfully!");
      closeForm();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog open={open} closeForm={closeForm} title="Register">
      <div className="Register">
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        <button type="button" onClick={(e) => registerHandle()}>
          Register
        </button>
      </div>
    </Dialog>
  );
}

export default Register;
