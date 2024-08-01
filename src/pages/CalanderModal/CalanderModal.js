import React from 'react'
import Calander from "../../components/Calander/Calander";
import { useState } from 'react';

function CalanderModal(selectedProcedure,  doctorId) {

  // const [firstName, setFirstName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [selectedProcedure, setSelectedProcedure] = useState('');
  // const [selectedProvider, setSelectedProvider] = useState('');
  // const [procedureName, setprocedureName] = useState([]);
  // const [providers, setProviders] = useState([]);
  // const [selectedProviderId, setSelectedProviderId] = useState('');
  // const [showBookDoctorsArea, setShowBookDoctorsArea] = useState(false);
    console.log("doc id", selectedProcedure )

  return (
    <div>
      <Calander  selectedProcedure={selectedProcedure}
        doctorId = { doctorId}
       
       
        />
       
    </div>
  )
}

export default CalanderModal
