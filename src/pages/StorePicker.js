import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getFunName } from "../utils/helpers";

const StorePicker = () => {
  const { push } = useHistory();
  const [storeName, setStoreName] = useState(getFunName());

  const goToStore = e => {
    e.preventDefault();
    push(`/store/${storeName}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        onChange={({ target }) => setStoreName(target.value)}
        placeholder="Store Name"
        required
        type="text"
        value={storeName}
      />
      <button type="submit">Visit Store →</button>
    </form>
  );
};

export default StorePicker;
