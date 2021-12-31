import React from "react";

function SearchBox(props) {
    console.log(props.value)
  return (
    <div className="col clo-sm-4">
      <input
        className="form-control"
        value={props.value}
        onChange={(e) => props.handleSerach(e.target.value)}
        placeholder="Type to Search"
      />
    </div>
  );
}

export default SearchBox;
