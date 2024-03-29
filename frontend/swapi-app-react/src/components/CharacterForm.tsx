import { z } from "zod";
import styles from "../styles/characterForm.module.css";
import { useForm } from "react-hook-form";

interface CFProps {
  onSubmit: (data: FormData) => void;
}

const schema = z.object({
  name: z.string().min(3).max(20),
});

type FormData = z.infer<typeof schema>;

const CharacterForm = ({ onSubmit }: CFProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <form className=" p-3" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Add character
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className={`form-control ${styles.customInput}`}
          style={{ backgroundColor: "rgb(53,53,53)", color: "yellow" }}
          placeholder="Type name of character"
        />
        {errors.name && (
          <p className="text-danger">Please supply full character name</p>
        )}
        <button type="submit" className={`${styles.buttonCustom} btn mt-2`}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
