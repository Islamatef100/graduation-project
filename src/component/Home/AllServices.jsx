import React from 'react'
import traficroad from '../../images/traficRoad.jpeg'
import trafficServices from '../../images/trafficServices.png'
//add car
import { MdOutlinePhone } from "react-icons/md";
// conatct us
import { FcCustomerSupport } from "react-icons/fc";
// car stolen
import { AiFillAlert } from "react-icons/ai";
//payment
import { SiContactlesspayment } from 'react-icons/si' 
// not for me
import { ImNotification } from 'react-icons/im' 
import { MdDirectionsCarFilled } from 'react-icons/md' 
import safecare from '../../images/safeCar.jpeg'
export default function AllServices() {
  return (
      <div className='AllServicesSection container'>
           <div className='services'>
              <div className='itemService'>
                  < SiContactlesspayment fontSize='40px' color='teal'/>
                  <p>الدفع</p>
              </div>
              <div className='itemService'>
                  < MdDirectionsCarFilled fontSize='40px' color='teal'/>
                  <p> الابلاغ عن سرقع السياره</p>
                 
              </div>
              <div className='itemService' style={{marginTop:'-40px'}}>
                  <img src={safecare} alt='safecar Image' style={{ width: '150px', height:'80px'}}/>
                  <p>  وحدت سيارتي  </p>
                 
              </div>
              <div className='itemService'>
                  < MdOutlinePhone fontSize='40px' color='teal'/>
                  <p> اضافه سياره</p>
                 
              </div>
              <div className='itemService'>
                  < FcCustomerSupport fontSize='40px'/>
                  <p>التحدث معنا</p>
              </div>
              <div className='itemService'>
                  < ImNotification fontSize='40px' color='teal'/>
                  <p>  ليست فتورتك</p>
              </div>
              
          </div >
          <div className='traficRoad'>
              <img src={trafficServices}/>
          </div>
    </div>
  )
}
