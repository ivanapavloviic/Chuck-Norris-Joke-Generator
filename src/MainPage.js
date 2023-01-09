import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import background from "./background.jpg";
import styled from "styled-components";
import listDecoration from "./listDecoration.css";
function MainPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [randomFact, setRandomFact] = useState(null);

  useEffect(() => {
    // fetch a random fact when the component mounts
    axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
      setRandomFact(response.data.value);
    });

    // retrieve previous searches from local storage
    const storedSearches = JSON.parse(localStorage.getItem("previousSearches"));
    if (storedSearches) {
      setPreviousSearches(storedSearches);
    }
  }, []);

  function handleSearch(query) {
    axios
      .get(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((response) => {
        setSearchResults(response.data.result);
        setPreviousSearches([query, ...previousSearches]);
        localStorage.setItem(
          "previousSearches",
          JSON.stringify([query, ...previousSearches])
        );
      });
  }

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #9b5d26;
    padding-top: 10vh;
  `;
  const RandomFact = styled.p`
    font-size: 1.5em;
    text-align: center;
    color: #9b5d26;
    font-weight: bold;
    padding-top: 10vh;
  `;
  const ListStyle = styled.ul`
    color: #9b5d26;
    font-weight: bold;
  `;
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "105vh",
        marginTop: "-5vh",
        backgroundSize: 'cover',
            overflow: 'hidden',
      }}
    >
      <Title>Chuck Norris Fact Generator</Title>
      <SearchForm onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <div>
          <Title>Search Results</Title>
          <div className="slider">
            <ul>
              {searchResults.map((fact) => (
                <li key={fact.id}>
                  <Link to={`/fact/${fact.id}`}>{fact.value}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          {previousSearches.length > 0 ? (
            <div>
              <Title>Previous Searches</Title>
              <ListStyle>
                {previousSearches.map((search) => (
                  <li key={search}>{search}</li>
                ))}
              </ListStyle>
            </div>
          ) : (
            <RandomFact>{randomFact}</RandomFact>
          )}
        </div>
      )}
    </div>
  );
}

export default MainPage;
