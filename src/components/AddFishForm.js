import React, { useState } from "react";
import PropTypes from "prop-types";

const blankFish = {
  name: "",
  price: "",
  status: "",
  desc: "",
  image: "",
};

const AddFishForm = ({ addFish }) => {
  const [values, setValues] = useState({
    ...blankFish,
  });

  const onChange = ({ target: { name, value } }) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="fish-edit"
      onSubmit={e => {
        e.preventDefault();
        addFish({
          ...values,
          price: parseFloat(values.price),
        });
        setValues({ ...blankFish });
        e.currentTarget.reset();
      }}
    >
      <input
        name="name"
        placeholder="Name"
        type="text"
        value={values.name}
        {...{ onChange }}
      />

      <input
        name="price"
        {...{ onChange }}
        placeholder="Price"
        type="text"
        value={values.price}
      />
      <select {...{ onChange }} name="status" value={values.status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>

      <textarea
        name="desc"
        {...{ onChange }}
        placeholder="Desc"
        value={values.desc}
      />
      <input
        name="image"
        {...{ onChange }}
        placeholder="Image"
        type="text"
        value={values.image}
      />
      <button type="submit">+ Add Fish</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired,
};

export default AddFishForm;
