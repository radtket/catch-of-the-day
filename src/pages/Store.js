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

  return (
    <div className="catch-of-the-day">
      <Menu {...{ ...state, setState }} />
      <Order {...{ ...state, setState }} />
      <Inventory {...{ ...state, setState }} />
    </div>
  );
};

export default Store;
