import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DoctorService from "../services/DoctorService";
import '../css/DoctorProfile.css';

const DocProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    const docId = sessionStorage.getItem("docId")
  
    useEffect(() => {
      const getDocInfo = async () => {
        try {
          const data = await DoctorService.getDoctorById(docId)
         
          if(data){
            setDoctor(data.doctor)
          }
  
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
      setDoctorAfterRender(doctor);

    },[docId])
  
    if (!doctor) {
      return <div>Loading...</div>;
    }

    const handleScheduleRedirecting = () =>{
      navigate('/docSchedule')
    }
  
    return (
      <div className="profile-content">
        <img src={doctor.image} alt={`${doctor.image}`} />
        <div className="text-content">
          <p>{`Dr. ${doctor.name}`}</p>
          <p>{`Email: ${doctor.email}`}</p>
          <p>{`Work field: ${doctor.field}`}</p>
          <button onClick={handleScheduleRedirecting}> Make an appointment</button>
        </div>
       
      </div>
    );
  };
  
  export default DocProfile;