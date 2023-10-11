import React, { useEffect, useState } from 'react';
import axios from 'axios'
import DoctorService from '../services/DoctorService';
import contactImg from '../assets/images/contactImg.png' 



const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
    

    useEffect(() => {
        DoctorService.getAllDoctors()
            .then(data => setDoctors(data.doctors))
    }, []);

    return ( 
       <div className='doctors-cards'>
        {doctors.map(doc => 
            <div className='doctorCardContent'key={doc.id}>
                <img src={contactImg}/>
                <h4> Dr. {doc.name}</h4>
                <p> Field: {doc.field}</p>
            </div>
            
            )}
           
        </div>
     );
}
 
export default Doctors;