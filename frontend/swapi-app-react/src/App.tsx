import { useEffect, useState } from "react";
import CharacterForm from "./components/CharacterForm";
import CharacterList from "./components/CharacterList";
import axios, { CanceledError } from "axios";

interface Character {
  id: number;
  name: string;
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const controller = new AbortController();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/people", { signal: controller.signal })
      .then((res) => {
        setCharacters(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          console.error("Error", err);
          return;
        } else {
          console.error("Error", err);
          setError(err.message);
        }
      });
    // return () => controller.abort();
  }, []);

  return (
    <>
      <h1>STAR WARS API</h1>
      <CharacterForm />
      <CharacterList characters={characters} />
    </>
  );
}

export default App;
