import React from "react";
import "./Modal.css";
import PatientForm from "./PatientFormComponent"

function Modal({ setOpenModal, setShowLogo }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => { setOpenModal(false); setShowLogo(true)}}>X</button>
                </div>
                <div className="patForm">
                <PatientForm></PatientForm>
                </div>
            </div>
        </div>
    );
}

export default Modal;