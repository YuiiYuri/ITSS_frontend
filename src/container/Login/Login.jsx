import React, { useContext } from "react";
import fb from "./fb.png";
import gg from "./gg.svg";
import { useRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const signin = (event)=>{
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // Kiểm tra dữ liệu nhập vào
    if (email.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
        return false; // Ngăn form được gửi đi
    }
    // Kiểm tra định dạng email (ví dụ đơn giản, bạn có thể sử dụng các thư viện kiểm tra email phức tạp hơn)
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return false; // Ngăn form được gửi đi
    }
    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return false; // Ngăn form được gửi đi
    }
    if (password.includes(' ')) {
        alert('Password cannot contain spaces');
        return false; // Ngăn form được gửi đi
    }
    axios.post("http://localhost:4000/sign-in",{
      mail: email,
      password: password
    }).then((res)=>{
      user.setJwt(res.data.jwt);
      user.setRole(res.data.role);
      console.log(res.data.username);
      user.setUsername(res.data.username);
      navigate("/");
    }).catch((err)=>{
      alert(err.response.data);
    })
  }
  return (<div className="son-container">
    <div className="login-container">
      <h2>Log in</h2>
      <div className="social-buttons">
        <button className="son-button">
          <img
            src={fb}
            alt="Google Logo"
            className="logo"
          />Continue with Google
        </button>
        <button className="son-button">
          <img
            src={gg}
            alt="Facebook Logo"
            className="logo"
          />Continue with Facebook
        </button>
      </div>
      <form id="loginForm" onSubmit={(event)=>signin(event)}>
        <label htmlFor="email">Email</label>
        <input
        ref={emailRef}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
          ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" id="loginBtn">Log in</button>
      </form>

      <div>
        <a href="#" id="forgotPasswordLink">Forgot your password?</a><br />
        <div id="signupContainer">
          <span>Don't have an account?</span>
          <a href="/signup" id="signupLink">Sign up</a>
        </div>
      </div>
    </div>
  </div>);
};

export default Login;
