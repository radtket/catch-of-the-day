import React from "react";
import PropTypes from "prop-types";

const LogoutButton = ({ onClick }) => {
  return (
    <button {...{ onClick }} type="button">
      Log Out!
    </button>
  );
};

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LogoutButton;
