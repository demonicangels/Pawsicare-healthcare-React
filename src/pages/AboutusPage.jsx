import '../css/AboutUs.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function About() {

    const mapCenter = [51.451672, 5.479698];
  
      return (
        <div className='page-content'>
              <div className='aboutUs-heading'>
                <h1 className='remove-margin'>ABOUT US</h1>
              </div>
  
              <div className="aboutUs-grid">
  
                  <div className="aboutUs-grid-left">
                      <div className='aboutUs-description'>
                          <h1 className='remove-margin'>Pawsicare is a website created by Pawsicare Inc. in 2023. It was established in Eindhoven, 
                          the Netherlands, by the CEO of the company as a study project. 
                          The goal of the website is to provide pet owners with a variety of veterinarian doctors in one platform so they can easily keep their pet in perfect health.</h1>
                      </div>
                  </div>
  
                  <div className="aboutUs-grid-right">
                    <MapContainer center={mapCenter} zoom={15} style={{ height: '170%', width: '130%' }}>
  
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
  
                    <Marker position={mapCenter}>
                      <Popup>Pawsicare Headquarters</Popup>
                    </Marker>
  
                  </MapContainer>
                  </div>
  
              </div>
      </div>)
}  
  export default About;