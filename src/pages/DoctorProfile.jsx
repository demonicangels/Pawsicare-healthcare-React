import { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";

const DocProfile = () => {
    const [doctor, setDoctor] = useState(null);

    const docId = sessionStorage.getItem("docId")
  
    useEffect(() => {
      const getDocInfo = () => {
        try {
          DoctorService.getDoctorById(docId)
          .then(data => setDoctor(data.doctor))
  
        } catch (error) {
          console.error('Error fetching doctor information:', error.message);
        }
      };

      getDocInfo()
  
    }, []);

    useEffect(() => {
      const setDoctorAfterRender = (response) =>{
        setDoctor(response)
        console.log(doctor)

      }
    },[docId])
  
    if (!doctor) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="profile-content">
        <img src={doctor.image} alt={`${doctor.image}`} />
        <div className="text-content">
          <p>{`Dr. ${doctor.name}`}</p>
          <p>{`Email: ${doctor.email}`}</p>
          <p>{`Work field: ${doctor.field}`}</p>
        </div>
      </div>
    );
  };
  
  export default DocProfile;