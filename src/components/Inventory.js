/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import sampleFishes from "../utils/data/sample-fishes";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import LogoutButton from "./LogoutButton";
import Login from "./Login";
import { base, firebaseApp } from "../base";

const Inventory = ({ fishes, setFishes }) => {
  const {
    params: { storeId },
  } = useRouteMatch();

  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  const authHandler = async (authData, store_id) => {
    const store = await base.fetch(store_id, {});
    if (!store.owner) {
      await base.post(`${store_id}/owner`, { data: authData.user.uid });
    }
    setUid(authData.user.uid);
    setOwner(store.owner || authData.user.uid);
  };

  const authenticate = (store_id, provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(data => authHandler(data, store_id));
  };

  useEffect(() => {
    console.log("firebase.auth");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user }, storeId);
      }
    });
  }, [storeId]);

  const loadSampleFishes = () => {
    setFishes(prev => ({
      ...prev,
      sampleFishes,
    }));
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setUid(null);
  };

  if (!uid) {
    return <Login authenticate={provider => authenticate(storeId, provider)} />;
  }

  // 2. check if they are not the owner of the store
  if (uid !== owner) {
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
              setFishes,
            }}
          />
        );
      })}
      <AddFishForm {...{ setFishes }} />
      <button onClick={loadSampleFishes} type="button">
        Load Sample Fishes
      </button>
    </div>
  );
};

Inventory.propTypes = {
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  setFishes: PropTypes.func.isRequired,
};

export default Inventory;
