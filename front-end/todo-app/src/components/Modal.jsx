import { useState } from "react";
import { useEffect } from "react";
import styles from "../css/Modal.module.css";

const Modal = ({ task, onClose, onUpdate, onAdd }) => {
  const isNew = !task;
  const [title, setTitle] = useState(isNew ? "" : task.title);
  const [description, setDescription] = useState(isNew ? "" : task.description);
  const [done, setDone] = useState(isNew ? "" : task.done);

  useEffect(() => {
    if (!isNew) {
      setTitle(task.title),
        setDescription(task.description),
        setDone(task.done);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      ...task,
      title,
      description,
      done,
    };

    if (isNew) {
      onAdd(newTask);
    } else {
      onUpdate(newTask);
    }

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{isNew ? "Adicionar tarefa" : "Editar tarefa"}</h2>
        <form className={styles.formModal} onSubmit={handleSubmit}>
          <div className={styles.formGroupModal}>
            <label htmlFor="title">Titulo</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder={isNew ? "Digite o titulo da tarefa aqui." : ""}
            />
          </div>

          <div className={styles.formGroupModal}>
            <label htmlFor="description">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              cols="30"
              rows="10"
              placeholder={isNew ? "Digite a descrição da tarefa aqui." : ""}
            ></textarea>
          </div>

          <div className={styles.checked}>
            <label htmlFor="done">Concluida</label>
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
          </div>

          <div className={styles.buttonsModal}>
            <button style={{ backgroundColor: "#0866ff" }} type="submit">
              Salvar
            </button>
            <button
              style={{ backgroundColor: "#ff0000" }}
              type="button"
              onClick={onClose}
              className={styles.buttonModalTwo}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
