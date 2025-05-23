import { useState } from "react";
import Modal from "../components/Modal";
import styles from "../css/TaskComponent.module.css";

const TaskComponent = ({ tasks, onDelete, onUpdate }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <div className={styles.tabelaContainer}>
        <table className={styles.tabelaTarefas}>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.done ? "Feito" : "Pendente"}</td>
                <td>
                  <button
                    style={{ backgroundColor: "#086fff" }}
                    className={styles.button}
                    onClick={() => setSelectedTask(task)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ backgroundColor: "#ff0000" }}
                    className={styles.button}
                    onClick={() => onDelete(task.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTask && (
          <Modal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </>
  );
};

export default TaskComponent;
