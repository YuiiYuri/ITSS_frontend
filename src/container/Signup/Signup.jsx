import React, { useRef } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordref = useRef();
  const navigate = useNavigate();
  function validateForm(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repassword = repasswordref.current.value;
    // Kiểm tra dữ liệu nhập vào
    if (email.trim() === '' || password.trim() === '' || repassword.trim() === '') {
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
    if (password !== repassword) {
        alert('Passwords do not match');
        return false; // Ngăn form được gửi đi
    }
    if (password.includes(' ')) {
        alert('Password cannot contain spaces');
        return false; // Ngăn form được gửi đi
    }
    // Nếu dữ liệu nhập vào đúng, cho phép form được gửi đi
    axios.post("http://localhost:4000/sign-up", {
      mail: email,
      password: password,
      auth_method: "website registered",
    }).then((response)=>{
        console.log(response);
        alert(response.data);
        
        navigate('/login');
    }).catch((e)=>{     
      alert(e.response.data);
    })
}
  return( <div className="duy-container">
     <div className="container">
      <h2>Sign up</h2>
      <div>
        <button  className="icon-button google">
          <i className="fab fa-google"></i> Continue with Google
        </button>
        <button  className="icon-button facebook">
          <i className="fab fa-facebook"></i> Continue with Facebook
        </button>
        <button  className="icon-button apple">
          <i className="fab fa-apple"></i> Continue with Apple
        </button>
      </div>

      <div>
        <form id="myForm" method= "post" onSubmit={(event)=>validateForm(event)}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailRef} required /><br />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef} required /><br />

          <label htmlFor="repassword">Confirm password</label>
          <input type="password" id="repassword" name="repassword" ref={repasswordref} required /><br />

          <button type="submit" id="submit-button">Sign up with Email</button>
        </form>
      </div>

      <div className="login">
        Already signed up? <a href="/login" id="link-login">Go to login</a>
      </div>
    </div>
  </div>);
};

export default Signup;
