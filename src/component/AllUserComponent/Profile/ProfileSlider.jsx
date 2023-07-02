import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import './Style.css'
import  {ProfileData} from './ProfileData'
const ProfileSlider = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  return (
    <div className='Slider'>
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item className="Slider-item" interval={3000}>
          <div className="Slider-text">
            <div style={{textAlign:'center'}}>
              <h1>{ProfileData[0].text}</h1>
            <h3 style={{ color: 'red' }}>{ProfileData[0].Allpayed} جنيه مصري </h3>
            </div>            
          </div>
        </Carousel.Item>
        <Carousel.Item className="Slider-item" interval={3000}>
          <div className="Slider-text">
              <div style={{textAlign:'center'}}>
              <h1>{ProfileData[1].text}</h1>
            <h3 style={{ color: 'red' }}>{ProfileData[1].AllNeedToPay} جنيه مصري </h3>
            </div>     
          </div>
        </Carousel.Item>

        <Carousel.Item className="Slider-item" interval={3000}>
          <div className="Slider-text">
            <div style={{textAlign:'center'}}>
              <h1>{ProfileData[2].text}</h1>
            <h3 style={{ color: 'red' }}>{ProfileData[2].AllExtraMoneyPayd} جنيه مصري </h3>
            </div>     
          </div>
          
        </Carousel.Item>
      </Carousel>
    
    </div>
  )
}
export default ProfileSlider
