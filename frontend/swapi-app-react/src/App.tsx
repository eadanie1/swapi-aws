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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [swap, setSwap] = useState([]);
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

  useEffect(() => {
    if (formData) {
      axios
        .post("http://localhost:3000/api/people/add-character", {
          name: formData.name,
        })
        .then((res) => {
          console.log(res);
          setCharacters((prevCharacters) => [...prevCharacters, res.data]);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [formData]);

  useEffect(() => {
    if (swap.length > 1) {
      axios
        .put(`http://localhost:3000/api/people/swap/${swap[0]}/${swap[1]}`)
        .then((res) => {
          setCharacters([...res.data]);
        })
        .catch((err) => {
          setError(err.message);
        });
      setSwap([]);
    }
  }, [swap]);

  // useEffect(() => {
  //   if (swap.length > 1) {
  //     axios
  //       .delete(`http://localhost:3000/api/people/swap/${swap[0]}/${swap[1]}`)
  //       .then((res) => {
  //         setCharacters([...res.data]);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //       });
  //     setSwap([]);
  //   }
  // }, [swap]);

  // /api/people/delete-character

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  const handleSwapClick = (id: number) => {
    console.log(id);
    setSwap((prevArray) => [...prevArray, id]);
    console.log(swap);
  };

  // const handleDeleteClick = (id: number) => {
  //   console.log(id);
  //   setCharacters(characters.filter(c => ));
  // };

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src="src/images/Star_Wars_Logo.svg" />
      </div>
      <CharacterForm onSubmit={handleFormSubmit} />
      <CharacterList
        characters={characters}
        onSwapClick={handleSwapClick}
        // onDeleteClick={handleDeleteClick}
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
