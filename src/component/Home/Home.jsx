import React from 'react'
import VD from './VID.mp4'
import './StyleHome.css'
import AccordionSection from './Accordion'
export default function HomeComponent() {
  return (
      <>
          <div className='VdStyle'>
              <video  autoPlay loop muted >
                <source src={VD} type='video/mp4' />
              </video>    
      </div>
      <div className='d-flex justify-content-center'>
         <h1 className='poularQueston'>اسئله شائعه</h1>
      </div>
     
    <AccordionSection/>
      </>
    )
}
