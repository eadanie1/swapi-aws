import { useEffect, useState } from "react";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import axios, { CanceledError } from "axios";

interface Character {
  id: number;
  name: string;
}

interface FormData {
  name: string;
}

function App() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const controller = new AbortController();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [swapCharacter, setSwap] = useState([]);
  const [removeCharacter, setRemove] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/api/people", { signal: controller.signal })
      .then((res) => {
        setCharacters(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          console.error("Error", err);
          setLoading(false);
          return;
        } else {
          console.error("Error", err);
          setError(err.message);
          setLoading(false);
        }
      });
    // return () => controller.abort();
  }, []);

  useEffect(() => {
    if (formData) {
      setLoading(true);

      axios
        .post("http://localhost:3000/api/people/add-character", {
          name: formData.name,
        })
        .then((res) => {
          console.log(res);
          setCharacters((prevCharacters) => [...prevCharacters, res.data]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [formData]);

  useEffect(() => {
    if (swapCharacter.length > 1) {
      setLoading(true);

      axios
        .put(
          `http://localhost:3000/api/people/swap/${swapCharacter[0]}/${swapCharacter[1]}`
        )
        .then((res) => {
          setCharacters([...res.data]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      setSwap([]);
    }
  }, [swapCharacter]);

  useEffect(() => {
    if (removeCharacter) {
      setLoading(true);

      axios
        .delete(
          `http://localhost:3000/api/people/delete-character/${removeCharacter}`
        )
        .then((res) => {
          setCharacters(characters.filter((c) => c.id !== removeCharacter));
          setLoading(false);
        })
        .catch((err) => {
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
      <header className="d-flex justify-content-center">
        <img
          style={{ width: "25%", height: "25%" }}
          src="src/images/Star_Wars_Logo.svg"
        />
      </header>
      <CharacterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      <CharacterList
        characters={characters}
        onSwapClick={handleSwapClick}
        onDeleteClick={handleDeleteClick}
      />
      <footer className="mt-3">
        <small
          className="p-3"
          style={{ color: "rgba(255,255,0,.5)", fontStyle: "italic" }}
        >
          Images and icons taken from icons8, Wikipedia and
          https://github.com/vieraboschkova/swapi-gallery
        </small>
      </footer>
    </>
  );
}

export default App;
