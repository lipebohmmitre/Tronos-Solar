import { useState } from "react";
import { LoginByEmailAndPassword } from "../../services/LoginService";
import { useNavigate } from "react-router-dom";


import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToAdminPage = () => {
    navigate('/administrador');
  };


  const HandlerLogin = async () => {
    
     await LoginByEmailAndPassword(email, password)
      navigateToAdminPage();
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>
           
            <span className="login-form-title">
              
            </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
                <a className="login-form-btn" onClick={() => HandlerLogin()}>Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;