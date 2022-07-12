import { Link } from "react-router-dom";
import { useRef } from "react";
import "./register.css";
import {useHistory} from 'react-router-dom'
import { axiosInstance } from "../../config";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      password.current.setCustomValidity("password mismatch!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
         await axiosInstance.post("/auth/register", user);
         history.push('/login')
      } catch (err) {}
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">theinisghts_social</h3>
          <span className="registerDesc">
            connect with friends and the world around you on theinisghts_social
          </span>
        </div>

        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              type="email"
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              type="password"
              minLength="5"
              ref={password}
              className="registerInput"
            />
            <input
              placeholder="Confirm Password"
              required
              type="password"
              minLength="5"
              ref={confirmPassword}
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign up
            </button>

            <button className="registerLoginButton"><Link to='/login' style={{textDecoration:'none', color:'inherit'}}>Log into Account</Link></button>
          </form>
        </div>
      </div>
    </div>
  );
}
