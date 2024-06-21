import { useEffect, useState } from "react";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import { CanceledError } from "./services/api-client";
import characterService, { Character } from "./services/characterService";
import styles from "../src/styles/app.module.css";
import { AxiosError, AxiosResponse } from "axios";

interface FormData {
  name: string;
}

function App() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [swapCharacter, setSwap] = useState<number[]>([]);
  const [removeCharacter, setRemove] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = characterService.getAll("/");
    request
      .then((res: AxiosResponse) => {
        if (Array.isArray(res.data)) {
          setCharacters(res.data as Character[]);
          setError(null);
        } else {
          console.error("Unexpected response data", res.data);
        }
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) {
          console.error("Error", err);
          setLoading(false);
          return;
        } else if (error) {
          console.error("Error", err);
          setError(err.message);
          setLoading(false);
        } else {
          console.error("Error", err);
          setLoading(false);
        }
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    if (formData) {
      setLoading(true);

      characterService
        .create("/add-character", {
          name: formData.name,
        })
        .then((res: AxiosResponse) => {
          setCharacters((prevCharacters) => [...prevCharacters, res.data]);
          setLoading(false);
          setError(null);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [formData]);

  useEffect(() => {
    if (swapCharacter.length > 1) {
      characterService
        .update(`/swap/${swapCharacter[0]}/${swapCharacter[1]}`)
        .then((res: AxiosResponse) => {
          setCharacters([...res.data]);
          setError(null);
        })
        .catch((err: AxiosError) => {
          setError(err.message);
        });
      setSwap([]);
    }
  }, [swapCharacter]);

  useEffect(() => {
    if (removeCharacter) {
      setLoading(true);

      characterService
        .delete(`/delete-character/${removeCharacter}`)
        .then((_: AxiosResponse) => {
          setCharacters((prevCharacters) =>
            prevCharacters.filter((c) => c.id !== removeCharacter)
          );
          setLoading(false);
          setError(null);
        })
        .catch((err: AxiosError) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [removeCharacter]);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  const handleSwapClick = (id: number) => {
    setSwap((prevArray) => [...prevArray, id]);
  };

  const handleDeleteClick = (id: number) => {
    setRemove(id);
  };

  return (
    <>
      <div className={styles.background} />
      <header className="d-flex justify-content-center">
        <img
          style={{ width: "25%", height: "25%" }}
          src="/images/Star_Wars_Logo transparent.svg"
          alt="Star Wars Logo"
        />
      </header>
      <CharacterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      {error && (
        <p className={`text-danger ${styles.errorMessage}`}>
          {error.includes("404")
            ? "The character does not exist in the SWAPI database"
            : error.includes("401")
            ? "The character already exists in the collection"
            : "An unexpected error occurred"}
        </p>
      )}
      <CharacterList
        characters={characters}
        onSwapClick={handleSwapClick}
        onDeleteClick={handleDeleteClick}
      />
      <footer className="mt-5">
        <small style={{ color: "rgba(255,255,0,.5)", fontStyle: "italic" }}>
          Images and icons taken from icons8, Wikipedia and
          https://github.com/vieraboschkova/swapi-gallery
        </small>
      </footer>
    </>
  );
}

export default App;
