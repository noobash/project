import React, { useState } from "react";
import styled from "styled-components";

const DivContainer = styled.div`
    padding: 30px;
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
`;

const StyledLabel  = styled.label`
    padding: 10px;
    color: rgb(0, 0, 32);
    font-weight: bold;
    margin:2px;
`;

const PatientInfo = (props) => {
    const {name, id, age, gender, bloodGroup, weight, diagonosis} = props;
    return (
        <DivContainer>
                <h2> Patient Details</h2>
                <DetailsContainer>
                <h3 style={{ textTransform: "capitalize", fontWeight: "bold"}}>{name}</h3>
                <StyledLabel>Id: {id}</StyledLabel>
                <StyledLabel>Age: {age}</StyledLabel>
                <StyledLabel>Gender: {gender}</StyledLabel>
                <StyledLabel>Blood Group: {bloodGroup}</StyledLabel>
                <StyledLabel>Weight: {weight}</StyledLabel>
                <StyledLabel>Diagonosis: {diagonosis}</StyledLabel>
                </DetailsContainer>
        </DivContainer>
    );
};

export default PatientInfo;