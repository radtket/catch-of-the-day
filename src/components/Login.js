import React from "react";
import PropTypes from "prop-types";

const Login = ({ authenticate }) => {
  return (
    <nav className="login">
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      <button
        className="github"
        onClick={() => authenticate("Github")}
        type="button"
      >
        Log In With GitHub
      </button>
      <button
        className="twitter"
        onClick={() => authenticate("Twitter")}
        type="button"
      >
        Log In With Twitter
      </button>
      <button
        className="facebook"
        onClick={() => authenticate("Facebook")}
        type="button"
      >
        Log In With Facebook
      </button>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
