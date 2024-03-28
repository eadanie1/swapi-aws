import styles from "../styles/characterForm.module.css";

const CharacterForm = () => {
  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Add character
      </label>
      <input
        id="name"
        type="text"
        className={`form-control ${styles.customInput}`}
        style={{ backgroundColor: "rgb(53,53,53)", color: "yellow" }}
        placeholder="Type name of character"
      />
    </div>
  );
};

export default CharacterForm;
