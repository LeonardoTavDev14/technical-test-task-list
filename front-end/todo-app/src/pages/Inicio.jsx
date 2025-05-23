import styles from "../css/Inicio.module.css";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.containerGeral}>
        <div className={styles.group}>
          <div className={styles.texts}>
            <h1>Sistema de Lista de Tarefas</h1>
          </div>
          <div className={styles.buttons}>
            <button onClick={register}>Cadastrar</button>
            <button onClick={login}>Entrar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicio;
