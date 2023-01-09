import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
function FactPage() {
  const { id } = useParams();
  const [fact, setFact] = useState(null);

  const RandomFact = styled.p`
    font-size: 1.5em;
    text-align: center;
    color: #9b5d26;
    font-weight: bold;
    padding-top: 10vh;
  `;
  const FactButton = styled.button`
margin: 0 auto;
float:right;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0 25px;
  font-size: 16px;
  line-height: 48px;
  border-radius: 8px;
  border: 0;
  color: #fff;
  cursor: pointer;
  z-index: 5;
  -webkit-transition: all 0.4s ease-out 0s;
  -moz-transition: all 0.4s ease-out 0s;
  -ms-transition: all 0.4s ease-out 0s;
  -o-transition: all 0.4s ease-out 0s;
  transition: all 0.4s ease-out 0s;
  background: -webkit-linear-gradient(left, #d4ca9f 0%, #9b8520 50%, #b7a75f 100%);
  background: -o-linear-gradient(left, #d4ca9f 0%, #9b8520 50%, #b7a75f 100%);
  background: linear-gradient(to right, #d4ca9f 0%, #9b8520 50%, #b7a75f 100%);
  background-size: 200%;
  &:hover{
    color: #fff;
    background-position: right center;
  }, `;

  useEffect(() => {
    axios.get(`https://api.chucknorris.io/jokes/${id}`).then((response) => {
      setFact(response.data);
    });
  }, [id]);

  if (!fact) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#F4F2C0",
        backgroundRepeat: "repeat!important",
        width: "100vw",
        height: "105vh",
        marginTop: "-5vh",
      }}
    >
      <img src={fact.icon_url} alt="" />
      <RandomFact>{fact.value}</RandomFact>
      <Link to="/">
        <FactButton>Return to main page</FactButton>
      </Link>
    </div>
  );
}

export default FactPage;
