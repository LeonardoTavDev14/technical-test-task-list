import { useState } from "react";
import styles from "../css/Formulario.module.css";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Formulario = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (!email) {
      setEmailError("O e-mail é obrigatório");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Insira um e-mail válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("A senha é obrigatória");
      isValid = false;
    } else if (password.length < 7) {
      setPasswordError("A senha deve conter sete caracteres no minimo");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (type === "login") {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URLLOGIN}`, {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        setPopupMessage(response.data.message);
        setPopupIsVisible(true);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/tasks");
        }, 2000);
      } catch (err) {
        setPopupMessage(err.response.data.message);
        setPopupIsVisible(true);
      }
    } else if (type === "register") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URLREGISTER}`,
          {
            email,
            password,
          }
        );
        setPopupMessage(response.data.message);
        setPopupIsVisible(true);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setPopupMessage(err.response.data.message);
        setPopupIsVisible(true);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.containerForm}>
            <div className={styles.containerText}>
              <h2>
                {type === "register" ? "Cadastrar usuário" : "Realizar login"}
              </h2>
              <p>
                Insira as informações abaixo para efetuar o {""}
                {type === "register" ? "cadastro" : "login"}
              </p>
            </div>

            <div className={styles.formGroupContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite o seu e-mail aqui"
                  style={{ borderColor: emailError ? "red" : "#ccc" }}
                />
                {emailError && (
                  <span className={styles.error}>{emailError}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Senha</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite o sua senha aqui"
                    style={{ borderColor: passwordError ? "red" : "#ccc" }}
                  />
                  <span
                    className={styles.passwordSpan}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {passwordError && (
                  <span className={styles.error}>{passwordError}</span>
                )}
              </div>

              <button type="submit" className={styles.buttonForm}>
                {type === "register" ? "Cadastrar" : "Logar"}
              </button>
            </div>
            <Link
              className={styles.link}
              style={{ color: "" }}
              to={type === "register" ? "/login" : "/register"}
            >
              {type === "register" ? "Entrar" : "Cadastre-se"}
            </Link>
          </div>
        </form>
      </div>

      {popupIsVisible && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupIsVisible(false)}
        />
      )}
    </>
  );
};

export default Formulario;
