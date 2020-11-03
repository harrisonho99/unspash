import React from "react";
const SearchBar = (props) => {
  return (
    <div className="ui segment">
      <form
        className="ui form"
        onSubmit={(e) => {
          props.handleSubmit(e);
        }}
      >
        <div className="field">
          <label htmlFor="input-field">Search Image: </label>
          <input
            type="text"
            onChange={(e) => {
              props.handleInput(e);
            }}
            id="input-field"
            value={props.inputDispay}
            placeholder="e.g: cars"
          />
        </div>
        <button className="ui button" type="submit" id="search-button">
          <i class="search icon"></i>
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
