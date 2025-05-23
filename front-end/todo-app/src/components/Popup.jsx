import styles from "../css/Popup.module.css";

const Popup = ({ message, onClose }) => {
  return (
    <>
      <div className={styles.popupOverlay}>
        <div className={styles.popup}>
          <p>{message}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </>
  );
};

export default Popup;
