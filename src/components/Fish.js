import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../utils/helpers";

const Fish = ({ image, name, price, desc, isAvailable, onClick }) => {
  return (
    <li className="menu-fish">
      <img alt={name} src={image} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} {...{ onClick }} type="button">
        {isAvailable ? "Add To Order" : "Sold Out!"}
      </button>
    </li>
  );
};

Fish.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Fish;
