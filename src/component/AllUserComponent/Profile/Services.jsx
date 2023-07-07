import { AiFillAlert } from "react-icons/ai";
import { MdDirectionsCarFilled } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { GiTargetDummy } from "react-icons/gi";

import { Link } from 'react-router-dom';
import vehicle from '../../../images/vehicle.png'
import AddNewCar from './AddNewCar';
import { useState, React } from 'react';
import MyCarStolen from "./MyCarStolen";
import safeCare from '../../../images/safeCar.jpeg'
import MyCarSafed from "./MyCarSafed";
export default function Services() {
  const [addCareCheck, setaddCareCheck] = useState(0)
  const [stolenCar, setStolenCar] = useState(0)
  const [safeCar, setSafeCar] = useState(0)
  
    return (
        <div className=' py-5 body-color'>
        {addCareCheck === 1 ? <AddNewCar exit={setaddCareCheck} /> : null}
        {stolenCar === 1 ? <MyCarStolen exit={setStolenCar} /> : null}
        {safeCar === 1 ? <MyCarSafed exit={setSafeCar} /> : null}
        
        
          <div className='d-flex justify-content-center all-title container'>
              <span className='title-shape-circle circle1'></span>
              <h1 className='min-title'>الخدمات</h1>
              <span className='title-shape-circle circle2'></span>
          </div >
         
          <div className='allServiceSection py-3 container'>
                  <div className='service' onClick={()=>setaddCareCheck(1)}>
                      <MdDirectionsCarFilled fontSize='10rem' color='blue' />
                      <div className='service-title'>
                          <h2>اضافه سياره</h2>
                        <MdAdd fontSize='3rem' color='teal'  /> 
                      </div>
                   </div>
    
         <Link to={'/ContactUs'}>
            <div className='service container'>
                <FcCustomerSupport fontSize='10rem' color='teal' />
                <div className='service-title'>
                          <h2> التحدث معنا</h2>
                        <MdOutlinePhone fontSize='3rem' color='teal'  /> 
                      </div>
            </div>
         </Link>
          <div className='service' onClick={() =>setStolenCar(1)}>
                      <img src={vehicle} style={{maxWidth:'250px',maxHeight:'160px'}}/>
                       <div className='service-title container'>
                              <h2>  سرقت السياره</h2>
                            <AiFillAlert fontSize='3rem' color='teal'  /> 
                      </div>
          </div>
           <div className='service' onClick={() =>setSafeCar(1)}>
                      <img src={safeCare} style={{maxWidth:'250px',maxHeight:'160px'}}/>
                       <div className='service-title container'>
                              <h2>  وجدت السياره</h2>
                            <GiTargetDummy fontSize='3rem' color='teal'  /> 
                      </div>
            </div>
          </div>
           
          
      </div>
  )
}
