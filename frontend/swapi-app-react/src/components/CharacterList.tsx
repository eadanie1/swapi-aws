import styles from "../styles/characterList.module.css";

interface Character {
  id: number;
  name: string;
}

interface CLProps {
  characters: Character[];
}

const CharacterList = ({ characters }: CLProps) => {
  console.log(characters);

  return (
    <div className="container">
      <div className="row">
        {characters.map((c) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={c.id}>
            <div className={`${styles.cardCustom} col card h-100`}>
              <img
                src={`/src/images/${c.name}.jpg`}
                className="card-img-top"
                alt={`Star Wars character ${c.name}`}
              />
              <div
                className={`card-body d-flex flex-column justify-content-between`}
              >
                <h5 className="card-title">{c.name}</h5>
                <button className={`${styles.buttonCustom} btn`}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
