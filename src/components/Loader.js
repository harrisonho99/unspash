import React from "react";
const Loader = (props) => {
  return (
    <div>
      {props.isLoading && (
        <div className="ui active centered inline loader"></div>
      )}
    </div>
  );
};

export default Loader;
