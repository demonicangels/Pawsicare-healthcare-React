import { useEffect } from "react";
import CarouselSlides from "../components/Carousel.jsx";
import '../css/HomePage.css'
import kittenImage from '../assets/images/kitten.jpg'
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    useEffect(() =>{
        const reload = sessionStorage.getItem("needsReload")

        if(reload === "true"){
            sessionStorage.setItem("needsReload", false);
            window.location.reload();
        }
        
    },[])

    const redirectToDoctorsPage = (event) => {
        event.preventDefault();
        
        navigate("/doctors")
    }

    return ( 
        <>
            <div className="background-image-homepage">
                <img className="image-settings" src={kittenImage}/>
                <div className="overlay"/>

                <div className="homepage-text">
                    <h1 className="homepage-remove-margin">Welcome to PawsiCare</h1>
                </div>

                <div className="background-homepage-container">

                    <div className="homepage-container-text">
                        <h1>Book your appointment today</h1>
                    </div>

                    <button type="toDoctors" className="buttonHomepage" onClick={redirectToDoctorsPage}>Book Now</button>

                </div>

            </div>

            <CarouselSlides/>

        </>
     );
}
 
export default Home;