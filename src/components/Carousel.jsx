import { useState } from 'react'
import kitten from '../assets/images/kitten.jpg'
import simillingDoggo from '../assets/images/smillingDoggo.jpg'
import '../css/Carousel.css'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const images = [
    {
        id: 1,
        Image: `${kitten}`
    },
    {
        id: 2,
        Image: `${simillingDoggo}`
    },
]

const CarouselSlides = () => {
    const [showMore,setShowMore] = useState(false)

    const btnText = () => {
        setShowMore(!showMore);
    }
    return ( 
        <div className='carousel'>
            <Carousel autoPlay interval={6000} axis="horizontal" infiniteLoop>
                {images.map((im) => (
                    <div key={im.id}>
                        <img src={`${im.Image}`} alt={`Image ${im.id}`} />
                        <p className="text">
                        {im.Image === kitten
                            ? 'Cat habits that cause concern '
                            : 'Care tips from our specialists'}
                        <span id="dots" style={{ display: showMore ? 'none' : 'inline' }}>
                            ...
                        </span>
                        <span id="more" style={{ display: showMore ? 'inline' : 'none' }}>
                            {im.Image === kitten
                            ? ' but are completely normal'
                            : 'for a happy and healthy dog'}
                        </span>
                        </p>
                        <a onClick={btnText} id='link' >
                            {showMore ? 'Read less' : 'Read More'}
                        </a>
                </div>
                    
                ))}
            </Carousel>
        </div>
    
            
        );
}
 
export default CarouselSlides;