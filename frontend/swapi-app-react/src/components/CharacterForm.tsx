import { z } from "zod";
import styles from "../styles/characterForm.module.css";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(3).max(20),
});

type FormData = z.infer<typeof schema>;

const CharacterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const formSubmit = (name) => {};

  return (
    <form onSubmit={handleSubmit(formSubmit(name))}>
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
        {errors.name && (
          <p className="text-danger">Please supply full character name</p>
        )}
        <button
          onClick={() => {}}
          type="submit"
          className={`${styles.buttonCustom} btn mt-2`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
