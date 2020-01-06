import React, { useState } from "react";

import sampleFishes from "../utils/data/sample-fishes";
import Menu from "../components/Menu";

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

  return (
    <div className="catch-of-the-day">
      <Menu {...{ ...state, addToOrder }} />
      <h1>Store</h1>
    </div>
  );
};

export default Store;
