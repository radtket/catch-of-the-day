import React, { useState } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import sampleFishes from "../utils/data/sample-fishes";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import LogoutButton from "./LogoutButton";
import Login from "./Login";
import { base, firebaseApp } from "../base";

const Inventory = ({ fishes, setState }) => {
  const {
    params: { storeId },
  } = useRouteMatch();

  const [auth, setAuth] = useState({
    uid: null,
    owner: null,
  });

  const authHandler = async authData => {
    // 1 .Look up the current store in the firebase database
    const store = await base.fetch(storeId, { context: this });
    console.log({ store });

    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    setAuth({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  const logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    setAuth(prev => ({ ...prev, uid: null }));
  };

  const addFish = fish => {
    setState(prev => {
      const copy = { ...prev };

      // Add our new fish to that fishes variable
      copy.fishes[`fish${Date.now()}`] = fish;

      return copy;
    });
  };

  const loadSampleFishes = () => {
    setState(prev => ({
      ...prev,
      fishes: sampleFishes,
    }));
  };

  if (!auth.uid) {
    return (
      <Login
        authenticate={provider => {
          const authProvider = new firebase.auth[`${provider}AuthProvider`]();
          firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(authHandler);
        }}
      />
    );
  }

  // 2. check if they are not the owner of the store
  if (auth.uid !== auth.owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        <LogoutButton onClick={logout} />
      </div>
    );
  }

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <LogoutButton onClick={logout} />
      {Object.entries(fishes).map(([key, fish]) => {
        return (
          <EditFishForm
            {...{
              index: key,
              fish,
              key,
              setState,
            }}
          />
        );
      })}
      <AddFishForm {...{ addFish }} />
      <button onClick={loadSampleFishes} type="button">
        Load Sample Fishes
      </button>
    </div>
  );
};

Inventory.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default Inventory;
