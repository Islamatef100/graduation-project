import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import img1 from '../../images/img1.png'
import img2 from '../../images/img2.png'
import img3 from '../../images/img3.png'
import img4 from '../../images/img4.png'
import img5 from '../../images/img5.png'
import img6 from '../../images/img6.png'
import img7 from '../../images/img7.png'
import img8 from '../../images/img8.png'

const HomeSlider = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  return (
    <div className='HomeSlider'>
      <Carousel activeIndex={index} onSelect={handleSelect} >
             <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img1} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img2} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img3} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img4} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img5} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img6} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img7} alt="" />
              </Carousel.Item>
              <Carousel.Item className="HomeSlider-item" interval={1500}>
                  <img src={img8} alt="" />
              </Carousel.Item>
      </Carousel>
    
    </div>
  )
}
export default HomeSlider
