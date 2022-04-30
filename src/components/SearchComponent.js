import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";
import MovieInfoComponent from "./MovieInfoComponent";
import { API_KEY } from "../App";
import People from "./user.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const getRandomPerson = () => {
  const s = People["results"];
  return s[Math.floor(Math.random() * s.length)];
};

const SearchComponent = (props) => {
  const {handleLogout} =  props;
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    // const response = await Axios.get(
    //     `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    // );
    const path = "/Data/";
    let images = [];
    if (searchString === "mri") {
      const cur_path = path + "MRI/";
      for (let i = 1; i <= 10; ++i) {
        let x = cur_path + i + ".png";
        images.push(x);
      }
    } else if (searchString === "ultrasound") {
      const cur_path = path + "Ultrasound/";
      for (let i = 1; i <= 10; ++i) {
        let x = cur_path + i + ".png";
        images.push(x);
      }
    }
    updateMovieList(images);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value.toLowerCase()), 500);
    updateTimeoutId(timeout);
  };
  return (
    <>
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-doc-app/doc-icon.png" />
          Doc App
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-doc-app/search-icon.svg" />
          <SearchInput
            placeholder="Search here"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie) => {
            const person = getRandomPerson();
            return (
              <MovieComponent
                key={movie}
                movie={movie}
                onMovieSelect={onMovieSelect}
                name={person.name.title + person.name.first}
                location={person.location.state}
                searchQuery={searchQuery}
              />
            );
          })
        ) : (
          <div style={{ alignContent: "center", justifyContent: "center" }}>
            Search using patient name or artifacts
            <Placeholder src="/react-doc-app/doc-icon.png" />
          </div>
        )}
      </MovieListContainer>
    </Container>
    <div id= "myDiv">
    <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
};

export default SearchComponent;
