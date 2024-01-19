import { useState } from 'react'
import kittens from '../assets/images/kittens.jpg'
import simillingDoggo from '../assets/images/smillingDoggo.jpg'
import '../css/Carousel.css'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const images = [
    {
        id: 1,
        Image: `${kittens}`
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
            <h1>Check out our animal blog!</h1>
            <Carousel autoPlay interval={6000} axis="horizontal" infiniteLoop>
                {images.map((im) => (
                    <div className='carouselContent' key={im.id}>
                        <img src={`${im.Image}`} alt={`Image ${im.id}`} />

                        <div className='text-carousel'>
                            <p className="text"  id='remove-margin'>
                            {im.Image === kittens
                                ? 'Cat habits that cause concern '
                                : 'Care tips from our specialists'}
                            <span id="dots" style={{ display: showMore ? 'none' : 'inline' }}>
                                ...
                            </span>
                            <span id="more" style={{ display: showMore ? 'inline' : 'none' }}>
                                {im.Image === kittens
                                ? ' but are completely normal'
                                : ' for a happy and healthy dog'}
                            </span>

                            <a className="readMoreOrLessElement" onClick={btnText} id='link' >
                                {showMore ? 'Read less' : 'Read More'}
                            </a>

                            </p>
                            
                        </div>
                    </div>
                ))}
            </Carousel>
            
        </div>
    
            
        );
}
 
export default CarouselSlides;