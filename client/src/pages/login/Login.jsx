import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">theinisghts_social</h3>
          <span className="loginDesc">
            connect with friends and the world around you on theinisghts_social
          </span>
        </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              minLength="5"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size={18} color= "inherit"/>
              ) : (
                "Log in"
              )}
            </button>

            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress size={18} color= "inherit" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>

            <span className="loginForgot">Forgot Password?</span>

            {error && (
              <span
                style={{ color: "red", textAlign:'center', fontSize: "11px", marginTop: "15px" }}
              >
                invalid credentials
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
