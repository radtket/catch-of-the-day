import React, { useState } from "react";

import sampleFishes from "../utils/data/sample-fishes";
import Menu from "../components/Menu";
import Order from "../components/Order";
import Inventory from "../components/Inventory";

const Store = () => {
  const [state, setState] = useState({
    fishes: sampleFishes,
    order: {},
  });

  const addToOrder = key => {
    setState(prev => {
      const order = { ...prev.order };
      // Either add to the order, or update the number in our order
      order[key] = order[key] + 1 || 1;

      return {
        ...prev,
        order,
      };
    });
  };

  const removeFromOrder = key => {
    setState(prev => {
      const order = { ...prev.order };
      // remove that itemf from order
      delete order[key];

      return {
        ...prev,
        order,
      };
    });
  };

  return (
    <div className="catch-of-the-day">
      <Menu {...{ ...state, addToOrder }} />
      <Order {...{ ...state, removeFromOrder }} />
      <Inventory {...{ ...state, setState }} />
    </div>
  );
};

export default Store;
