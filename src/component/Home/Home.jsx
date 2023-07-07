import React from 'react'
import VD from './VID.mp4'
import './StyleHome.css'
import AccordionSection from './Accordion'
import EgyptMap from './EgyptMao'
import AllServices from './AllServices'
import HomeSlider from './HomeSlider'
import { FaQuestion } from 'react-icons/fa'
import { GrServices } from 'react-icons/gr'

export default function HomeComponent() {
  return (
      <>
          {/* <div className='VdStyle'>
              <video  autoPlay loop muted  className='video'>
                <source src={VD} type='video/mp4' />
          </video>    
      </div> */}
      < HomeSlider />
          <div className='title-question'>
        <h1 className='poularQueston'>جميع الخدمات</h1>
        < GrServices  color='teal'  fontSize={'3rem'}/>
          </div>
          <AllServices />
      <div className='title-question'>
        <h1 className='poularQueston'>اسئله شائعه</h1>
         < FaQuestion color='teal'  fontSize={'3rem'} />
        </div>
          <AccordionSection />
          {/* < EgyptMap className='map'/> */}
      </>
    )
}
