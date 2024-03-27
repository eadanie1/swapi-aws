const CharacterForm = () => {
  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        New character details
      </label>
      <input id="name" type="text" className="form-control" />
    </div>
  );
};

export default CharacterForm;
