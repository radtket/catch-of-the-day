import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Fish from "./Fish";

const Menu = ({ fishes, addToOrder }) => {
  return (
    <div className="menu">
      <Header tagline="Fresh Seafood Market" />
      <ul className="fishes">
        {Object.entries(fishes).map(([key, value]) => {
          return (
            <Fish
              {...{
                ...value,
                key,
                onClick: () => addToOrder(key),
                isAvailable: value && value.status === "available",
              }}
            />
          );
        })}
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
