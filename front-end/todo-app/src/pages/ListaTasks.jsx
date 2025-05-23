import { useState } from "react";
import { useEffect } from "react";
import TaskComponent from "../components/TaskComponent";
import axios from "axios";
import Popup from "../components/Popup";
import styles from "../css/Lista.module.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ListaTasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URLLIST}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTasks(response.data));
  }, [tasks]);

  const handleDeleteTask = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_URLDELETE}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPopupMessage(response.data.message);
    setPopupIsVisible(true);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleUpdateTask = async (updatedTask) => {
    const response = await axios.put(
      `${import.meta.env.VITE_URLUPDATE}/${updatedTask.id}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPopupMessage(response.data.message);
    setPopupIsVisible(true);
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleAddTask = async (newTask) => {
    const response = await axios.post(
      `${import.meta.env.VITE_URLCREATE}`,
      newTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTasks([...tasks, response.data]);
    setPopupMessage(response.data.message);
    setPopupIsVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <button className={styles.logout} onClick={logout}>
        Sair
      </button>
      <div className={styles.container}>
        <div className={styles.containerTarefas}>
          <h2>Minhas tarefas</h2>
          <button onClick={() => setIsModelOpen(true)}>Adicionar tarefa</button>
        </div>
        <TaskComponent
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />

        {isModalOpen && (
          <Modal
            task={null}
            onAdd={handleAddTask}
            onClose={() => setIsModelOpen(false)}
          />
        )}
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

export default ListaTasks;
