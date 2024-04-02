import { z } from "zod";
import styles from "../styles/characterForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "react-hook-form";

interface CFProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const schema = z.object({
  name: z
    .string()
    .nonempty({ message: "Please provide a character name" })
    .min(3, { message: "Character name must contain at least 3 characters" })
    .max(20, { message: "Character name cannot be longer than 20 characters" }),
});

type FormData = z.infer<typeof schema>;

type SchemaType = typeof schema;
const adjustedZodResolver: Resolver<FormData, SchemaType> = zodResolver(schema);

const CharacterForm = ({ onSubmit, isLoading }: CFProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: adjustedZodResolver });

  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className=" d-flex flex-column align-items-center"
      style={{ padding: "12px" }}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <label htmlFor="name" className="form-label">
        Add character
      </label>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex align-items-center">
            <button type="submit" className={`${styles.buttonCustom} btn`}>
              Add
            </button>
            <input
              {...register("name")}
              id="name"
              type="text"
              className={`form-control ${styles.customInput}`}
              style={{
                backgroundColor: "rgb(53,53,53)",
                color: "yellow",
                maxWidth: "200px",
              }}
              placeholder="Type name of character"
            />
            {errors.name && (
              <div className={`text-danger ${styles.errorMessage}`}>
                {errors.name.message}
              </div>
            )}
          </div>
        </div>
        {isLoading && (
          <div style={{ marginLeft: "12px", marginTop: "5px" }}>
            <div className="spinner-border"></div>
          </div>
        )}
      </div>
    </form>
  );
};

export default CharacterForm;
