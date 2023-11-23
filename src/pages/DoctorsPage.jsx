import React, { useEffect, useState } from 'react';
import DoctorService from '../services/DoctorService';
import { useForm } from 'react-hook-form';
import '../css/DoctorsPage.css'
import { useNavigate } from 'react-router-dom';



const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const navigate = useNavigate()
    

    useEffect(() => {
        DoctorService.getAllDoctors()
            .then(data => setDoctors(data.doctors))
    }, []);

    const handleSelectedDoctor = (docId) => {
        
        sessionStorage.setItem("docId", docId);
        navigate("/docprofile");
    };

    const onSubmit = async (data) => {
        try{
            console.log(data);
            setDoctors([]);
        
            const response = await DoctorService.getDoctorsByField(data);
        
            if (response && response.Doctors) {
                setDoctors(response.Doctors);
            }
        } catch (err) {
            console.error("Error: ", err.message);
        }

    }

    return ( 
        <div className='page-container'>
        <div className='sidebar'>
            <h3>Search Doctors</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <input type="radio" name="field" {...register("field", {required: true})} value="neurology" />
                    Neurology
                </label>
                <label>
                    <input type="radio" name="field" {...register("field", {required: true})} value="cardiology" />
                    Cardiology
                </label>
                <label>
                    <input type="radio" name="field"  {...register("field", {required: true})} value="dermatology"/>
                    Dermatology
                </label>
                <button type="submit">Search</button>
            </form>
        </div>
        <div className='doctors-cards'>
            {doctors.map(doc => 
                <div className='doctorCardContent' key={doc.id} onClick={() => {
                    handleSelectedDoctor(doc.id)
                    sessionStorage.setItem("docId", doc.id)
                    }}>
                    <img className='image-wrapper' src={doc.image} alt={`Dr. ${doc.name}`}/>
                    <div className='text'>
                        <h4> Dr. {doc.name}</h4>
                        <p> Field: {doc.field}</p>
                    </div>
                </div>
            )}
        </div>
    </div> );
}
 
export default Doctors;