import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Menu from "../components/Menu";
import Order from "../components/Order";
import Inventory from "../components/Inventory";
import { base } from "../base";

const Store = () => {
  const {
    params: { storeId },
  } = useRouteMatch();

  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem(storeId)) || {}
  );

  useEffect(() => {
    const ref = base.syncState(`${storeId}/fishes`, {
      context: {
        setState: ({ fishes: fish }) => setFishes({ ...fish }),
        state: { fishes },
      },
      state: "fishes",
    });

    return () => {
      base.removeBinding(ref);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("localStorage");
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order, storeId]);

  return (
    <div className="catch-of-the-day">
      <Menu {...{ fishes, setOrder }} />
      <Order {...{ fishes, setFishes, order, setOrder }} />
      <Inventory {...{ fishes, setFishes, setOrder }} />
    </div>
  );
};

export default Store;
