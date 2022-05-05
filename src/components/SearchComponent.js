import Fuse from "fuse.js";
import React, { useState } from "react";
import styled from "styled-components";
import ScanComponent from "./ScanComponent";
import ModalComponent from "./ModalComponent";
import MovieInfoComponent from "./MovieInfoComponent";
import PatientInfoComponent from "./PatientInfoComponent";
import People from "./user.json";
import { GiHamburgerMenu } from "react-icons/gi";
import { db } from "../fire";
import { Image, VStack } from "@chakra-ui/react";
import PeopleList from "./people.json";
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
const ScanImage = styled.img`
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
const ScanListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const Placeholder = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 120px;
  margin-bottom: 5px;
  opacity: 50%;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 98px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const NavDropdown = styled.div`
  float: left;
  overflow: hidden;

  &:hover {
    background-color: #2980b9;
  }
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const DropdownButton = styled.button`
  font-size: 16px;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; /* Important for vertical align on mobile phones */
  margin: 0; /* Important for vertical align on mobile phones */
`;

const DropdownContentA = styled.a`
  font-size: 12px;
  float: none;
  color: black;
  padding: 12px 10px;
  text-decoration: none;
  display: block;
  text-align: left;

  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

const LogoDiv = styled.div`
  visibility: ${(props) => props.vis};
`;

const SearchComponent = (props) => {
  const { handleLogout } = props;
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [patientData, updatePatientData] = useState(null);
  const fuse = new Fuse(PeopleList, {
    includeScore: true,
    keys: ["doctorName", "history", "name", "problem.caption"],
  });
  // const fuse = new Fuse(characters, {
  //   keys: [
  //     'name',
  //     'company',
  //     'species'
  //   ],
  //   includeScore: true
  // });
  const mock = (value, timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value) {
          // resolve(updatePatientData(fuse.search(e.target.value)));
          resolve(updatePatientData(fuse.search(value)));
        } else {
          reject({ message: "Error" });
        }
      }, timeout);
    });
  };

  const onTextChange = async (e) => {
    onMovieSelect("");
    updateSearchQuery(e.target.value);
    return mock(e.target.value, 3000);
    // updatePatientData(fuse.search(e.target.value));
  };
  return (
    <Container>
      <Header>
        <AppName>
          <ScanImage src="/react-doc-app/doc-icon.png" />
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
        <NavDropdown>
          <DropdownButton>
            Menu <GiHamburgerMenu></GiHamburgerMenu>
          </DropdownButton>
          <DropdownContent>
            <DropdownContentA
              onClick={() => {
                setModalOpen(true);
                setShowLogo(false);
              }}
            >
              Add Patient
            </DropdownContentA>
            <DropdownContentA onClick={handleLogout}>LogOut</DropdownContentA>
          </DropdownContent>
        </NavDropdown>
      </Header>
      {modalOpen && (
        <ModalComponent setOpenModal={setModalOpen} setShowLogo={setShowLogo} />
      )}
      {/* {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )} */}
      {/* {patientData && (
        <PatientInfoComponent
          name={patientData.name}
          id={patientData.id}
          age={patientData.age}
          weight={patientData.weight}
          gender={patientData.gender}
          bloodGroup={patientData.blood_group}
          diagonosis={patientData.diagonosis}
        />
      )} */}
      <ScanListContainer>
        {patientData?.length ? (
          patientData.map((movie) => {
            const patient = movie.item;
            console.log(patient?.problem?.image, "haha");
            return (
              <VStack>
                <Image
                  // onClick={(window.location.href = `patient/${patient.id}`)}
                  boxSize="150px"
                  src={patient?.problem?.image}
                  alt="failed to load image"
                />
                <div>
                  <li>
                    <a href={`patient/${patient.id}`}>
                      PatientID: {patient.id}
                    </a>
                  </li>
                  <li>PatientName: {patient.name}</li>
                </div>
              </VStack>
            );
            // const person = getRandomPerson();
            // return (
            //   <ScanComponent
            //     key={movie}
            //     movie={movie}
            //     onMovieSelect={onMovieSelect}
            //     name={person.name.title + person.name.first}
            //     location={person.location.state}
            //     searchQuery={searchQuery}
            //   />
            // );
          })
        ) : (
          <LogoDiv
            vis={showLogo ? "visible" : "hidden"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              verticalAlign: "middle",
            }}
          >
            <Placeholder src="/react-doc-app/doc-icon.png" />
            <h6
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                opacity: "50%",
              }}
            >
              Search using patient name or artifacts
            </h6>
          </LogoDiv>
        )}
      </ScanListContainer>
    </Container>
  );
};

export default SearchComponent;
