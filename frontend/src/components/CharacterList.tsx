import styles from "../styles/characterList.module.css";

interface Character {
  id: number;
  name: string;
}

interface CLProps {
  characters: Character[];
  onSwapClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const CharacterList = ({ characters, onSwapClick, onDeleteClick }: CLProps) => {
  console.log(characters);

  const handleSwap = (id: number) => {
    onSwapClick(id);
  };

  const handleDelete = (id: number) => {
    onDeleteClick(id);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {characters.map((c) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4"
            key={c.id}
            style={{ minWidth: "200px" }}
          >
            <div className={`${styles.cardCustom} col card h-100`}>
              <img
                src={`/images/${c.name}.jpg`}
                className="card-img-top"
                alt={`Star Wars character ${c.name}`}
              />
              <div
                className={`card-body d-flex flex-column justify-content-between`}
              >
                <h5 className="card-title">{c.name}</h5>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    onClick={() => handleSwap(c.id)}
                    key={`swap-${c.id}`}
                    className={`${styles.buttonCustomSwap} btn`}
                  >
                    Swap
                  </button>
                  {/* <button
                    onClick={() => handleDelete(c.id)}
                    key={`delete-${c.id}`}
                    className={`${styles.buttonCustomDelete} btn`}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
