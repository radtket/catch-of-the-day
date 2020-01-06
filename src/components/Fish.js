import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../utils/helpers";

const Fish = ({ details, addToOrder, index }) => {
  const { image, name, price, desc, status } = details;
  const isAvailable = status === "available";
  return (
    <li className="menu-fish">
      <img alt={name} src={image} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}
        type="button"
      >
        {isAvailable ? "Add To Order" : "Sold Out!"}
      </button>
    </li>
  );
};

Fish.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  addToOrder: PropTypes.func,
  index: PropTypes.string,
};

export default Fish;
