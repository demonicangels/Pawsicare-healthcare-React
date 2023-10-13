import React, { useEffect, useState } from 'react';
import DoctorService from '../services/DoctorService';
import contactImg from '../assets/images/contactImg.png' 
import '../css/DoctorsPage.css'



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
                <img className='image-wrapper' src={doc.image}/>
                <div className='text'>
                    <h4> Dr. {doc.name}</h4>
                    <p> Field: {doc.field}</p>
                </div>
            </div>
            
            )}
           
        </div>
     );
}
 
export default Doctors;