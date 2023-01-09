import React, { useState } from "react";
import searchForm from "./searchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }
  // const SearchInput=styled.form`
  // margin: 0 auto;
  // display: block;
  // width:20vw;
  // height:4vh;
  // border-radius:0.5rem`

  // const searchButton=styled.button`
  // `
  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="txt"
          onMouseOut="this.value = ''; this.blur();"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      <FontAwesomeIcon className="icon" icon={faSearch} />
    </div>
  );
}

export default SearchForm;
