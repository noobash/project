import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieComponent = (props) => {
  const Poster = props.movie;
  return (
    <MovieContainer
    // onClick={() => {
    //   props.onMovieSelect(imdbID);
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }}
    >
      <CoverImage src={Poster} alt="img" />
      <div
        style={{
          paddingLeft: 1,
        }}
      >
        <li>PatientID: {Math.random().toString().substr(2, 12)}</li>
        <li>Name: {props.name}</li>
        <li>Location: {props.location}</li>
        <li>
          {props.searchQuery === "ultrasound" ? (
            <>
              CurrentOp: baby-ultrasound
              {/* {
                ["baby-ultrasound"][
                  Math.floor(
                    Math.random() * ["cancer", "liver", "thyroid"].length
                  )
                ]
              } */}
            </>
          ) : (
            <>
              CurrentOp:{" "}
              {
                ["cancer", "liver", "thyroid"][
                  Math.floor(
                    Math.random() * ["cancer", "liver", "thyroid"].length
                  )
                ]
              }
            </>
          )}
        </li>
      </div>
      {/* <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn> */}
    </MovieContainer>
  );
};
export default MovieComponent;
