import React, { useState } from "react";
import styled from "styled-components";
import "./patientForm.css";
import { db } from "../fire";

const dropdownContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap: wrap;
`;

const genderOptions = [
    'Male', 'Female', 'Other'
];

const bloodGrpOptions = ['A+', 'A-', 'AB+','AB-','B+','B-','O+','O-'];

const Patient_Form = () => {
    const [name, setName] = useState("");
    const [idNo, setIdNo] = useState("");
    const [age, setAge] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const [genderDropdown, setGenderDropdown] = useState("Not selected Anything");
    const [bloodGrpDropdown, setBloodGrpDropdown] = useState("Not selected Anything");
    const [weight, setWeight] = useState("");
    const [diagonosis, setDiagonosis] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);

    db.collection("Patients_Record")
        .add({
            id: idNo,
            name: name.toLowerCase(),
            age: age,
            date:startDate,
            gender:genderDropdown,
            blood_group: bloodGrpDropdown,
            weight: weight,
            diagonosis:diagonosis
        })
        .then(() => {
            setLoader(false);
            alert("Your response has been recorded successfully");
        })
        .catch((error) => {
            alert(error.message);
            setLoader(false);
        });

        setName("");
        setIdNo("");
        setAge("");
        setStartDate(new Date());
        setGenderDropdown("");
        setBloodGrpDropdown("");
        setWeight("");
    };

    return (
    <form className="form" onSubmit={handleSubmit}>
    <h4>Patient Details</h4>

    <label>Id</label>
    <input
        placeholder="Id"
        value={idNo}
        onChange={(e) => setIdNo(e.target.value)}
    />

    <label>Name</label>
    <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />

    <label>Age</label>
    <input
    placeholder="Age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    />

    <dropdownContainer>
        <label>Gender: </label>
        <select
            id="gender"
            value={genderDropdown}
            onChange={e => setGenderDropdown(e.target.value)}
            onBlur={e => setGenderDropdown(e.target.value)}
            disabled={!genderOptions.length}>
            <option>Select</option>
            {genderOptions.map(item =>
            <option key={item} value={item}>{item}</option>)}
        </select>

        <label>Blood Group: </label>
        <select
            id="blood-group"
            value={bloodGrpDropdown}
            onChange={e => setBloodGrpDropdown(e.target.value)}
            onBlur={e => setBloodGrpDropdown(e.target.value)}
            disabled={!bloodGrpOptions.length}>
            <option>Select</option>
            {bloodGrpOptions.map(item =>
            <option key={item} value={item}>{item}</option>)}
        </select>

    </dropdownContainer>
    
    <label>Weight</label>
    <input
    placeholder="Weight"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    />

    <label>Diagonosis</label>
    <input
    placeholder="Details"
    value={diagonosis}
    onChange={(e) => setDiagonosis(e.target.value)}
    />
    
    <button
    type="submit"
    style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
    >
    Submit
    </button>
</form>
);
};

export default Patient_Form;
