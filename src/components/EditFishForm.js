import React, { useState } from "react";
import PropTypes from "prop-types";

const EditFishForm = ({ fish, index, setState }) => {
  const [values, setValues] = useState({ ...fish });

  const updateFish = (key, updatedFish) => {
    setState(prev => {
      const copy = { ...prev };
      copy.fishes[key] = updatedFish;
      return copy;
    });
  };

  const deleteFish = () => {
    setState(prev => {
      const copy = { ...prev };
      delete copy.fishes[index];
      return copy;
    });
  };

  const onChange = ({ target: { value, name } }) => {
    setValues(prev => {
      const copy = { ...prev };
      copy[name] = name === "price" ? parseFloat(value) : value;
      updateFish(index, copy);
      return copy;
    });
  };

  return (
    <div className="fish-edit">
      <input name="name" {...{ onChange }} type="text" value={values.name} />
      <input name="price" {...{ onChange }} type="text" value={values.price} />
      <select name="status" {...{ onChange }} type="text" value={values.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" {...{ onChange }} value={values.desc} />
      <input name="image" {...{ onChange }} type="text" value={values.image} />
      <button onClick={deleteFish} type="button">
        Remove Fish
      </button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    isAvailable: PropTypes.bool,
    onClick: PropTypes.func,
  }).isRequired,
  index: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default EditFishForm;
