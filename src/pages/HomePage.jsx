import { useEffect } from "react";
import CarouselSlides from "../components/Carousel.jsx";



const Home = () => {
    useEffect(() =>{
        const reload = sessionStorage.getItem("needsReload")

        if(reload === "true"){
            sessionStorage.setItem("needsReload", false);
            window.location.reload();
        }
    },[])
    return ( 
        <div className="homepage">
            <CarouselSlides/>
        </div>
     );
}
 
export default Home;