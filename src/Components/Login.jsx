import React, { useState } from "react";
import CustomButton from "./CustomComponents/CustomButton";
import CustomTextField from "./CustomTextField";
import { PostRequest } from "../ApiRequests";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthService/AuthContext";

function Login() {
  const [username, setUsername] = useState("johnd"); 
  const [password, setPassword] = useState("m38rmF$"); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginClick = async () => {
    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    const credentials = { username, password };
    const response = await PostRequest("auth/login", credentials);

    if (response.token) {
      login(response.token);
      alert("Login Successful!");
      navigate("/");
    } else {
      alert(response); 
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="h-74 w-80 bg-white bg-opacity-80 p-6 border-2 border-yellow-500 flex flex-col items-center justify-center rounded-md shadow-md gap-5">
        <CustomTextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <CustomTextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <CustomButton text="Login" onClick={handleLoginClick} />
        <Link to="/register">
          <label className="text-blue-500 hover:text-yellow-500">Not Registered Yet? Register here</label>
        </Link>
      </div>
    </div>
  );
}

export default Login;