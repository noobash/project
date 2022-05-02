import React, { useState } from "react";
import styled from "styled-components";
import ScanComponent from "./ScanComponent";
import ModalComponent from "./ModalComponent"
import MovieInfoComponent from "./MovieInfoComponent";
import PatientInfoComponent from "./PatientInfoComponent";
import People from "./user.json";
import { GiHamburgerMenu } from "react-icons/gi"
import { db } from "../fire";


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
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
  visibility: ${props => props.vis};
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
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [patientData, updatePatientData] = useState(null);

  const fetchData = async (searchString) => {
    const path = "/Data/";
    updatePatientData(null);
    setShowLogo(true);
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
    } else if(searchString.length > 0) {
      const patientsRecord = db.collection("Patients_Record");  
      console.log(searchString);
      patientsRecord.where("name","==",searchString).limit(1).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setShowLogo(false);
            updatePatientData(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
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
          <NavDropdown >
          <DropdownButton>Menu <GiHamburgerMenu></GiHamburgerMenu></DropdownButton>
            <DropdownContent >
              <DropdownContentA onClick={() => {setModalOpen(true); setShowLogo(false);}}>Add Patient</DropdownContentA>
              <DropdownContentA onClick={handleLogout}>LogOut</DropdownContentA>
            </DropdownContent>
          </NavDropdown>
      </Header>
      {modalOpen && <ModalComponent setOpenModal={setModalOpen} setShowLogo={setShowLogo} />}
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      {patientData && <PatientInfoComponent 
        name={patientData.name}
        id={patientData.id}
        age={patientData.age}
        weight={patientData.weight}
        gender={patientData.gender}
        bloodGroup={patientData.blood_group}
        diagonosis={patientData.diagonosis}
        />}
      <ScanListContainer>
        {movieList?.length ? (
          movieList.map((movie) => {
            const person = getRandomPerson();
            return (
              <ScanComponent
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
          <LogoDiv vis={showLogo? "visible":"hidden"} style={{display:"flex", flexDirection:"column", alignItems:"center", verticalAlign:"middle" }}>
            <Placeholder src="/react-doc-app/doc-icon.png" />
            <h6 style={{marginLeft:"auto", marginRight:"auto", opacity:"50%"}}>Search using patient name or artifacts</h6>
          </LogoDiv>
        )}
      </ScanListContainer>
    </Container>
  );
};

export default SearchComponent;
