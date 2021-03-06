import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Fish from "./Fish";

const Menu = ({ fishes, setOrder }) => {
  const addToOrder = key => {
    setOrder(prev => {
      const order = { ...prev };
      // Either add to the order, or update the number in our order
      order[key] = order[key] + 1 || 1;

      return {
        ...prev,
        order,
      };
    });
  };

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
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default Menu;
