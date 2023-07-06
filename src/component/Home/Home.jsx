import React from 'react'
import VD from './VID.mp4'
import './StyleHome.css'
import AccordionSection from './Accordion'
import EgyptMap from './EgyptMao'
import AllServices from './AllServices'
export default function HomeComponent() {
  return (
      <>
          <div className='VdStyle'>
              <video  autoPlay loop muted  className='video'>
                <source src={VD} type='video/mp4' />
              </video>    
      </div>
       <div className='d-flex justify-content-center'>
         <h1 className='poularQueston'>جميع الخدمات</h1>
      </div>
       <AllServices />
      <div className='d-flex justify-content-center'>
         <h1 className='poularQueston'>اسئله شائعه</h1>
      </div>
      <AccordionSection />
      {/* < EgyptMap className='map'/> */}
      </>
    )
}
