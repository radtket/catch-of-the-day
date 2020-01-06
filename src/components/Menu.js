import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Fish from "./Fish";

const Menu = ({ fishes, addToOrder }) => {
  return (
    <div className="menu">
      <Header tagline="Fresh Seafood Market" />
      <ul className="fishes">
        {Object.keys(fishes).map(key => (
          <Fish
            key={key}
            {...{ addToOrder }}
            details={fishes[key]}
            index={key}
          />
        ))}
      </ul>
    </div>
  );
};

Menu.propTypes = {
  // fishes: PropTypes.objectOf(
  //   PropTypes.shape({
  //     name: PropTypes.string,
  //     image: PropTypes.string,
  //     desc: PropTypes.string,
  //     price: 1724,
  //     status: PropTypes.string,
  //   })
  // ).isRequired,
  addToOrder: PropTypes.func.isRequired,
};

export default Menu;
