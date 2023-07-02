import './Style.css'
import car8 from '../../../images/car8.jpeg'
import { Button } from 'react-bootstrap'
import { BsPersonVcard } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import { ImInsertTemplate } from 'react-icons/im'
import { MdColorLens } from 'react-icons/md'
import { MdLocationCity } from 'react-icons/md'
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
import React, { useContext, useState } from 'react'
// import { img } from '../../../../../355654084_570207801946753_1817848671160769477_n.jpg'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function CarCard({exit,number, nationalID, car_ID, car_Type, img_, color_, manufactureringYear, licenseCreateDate, licensEexpiredDate, vehicleClass,passageUnit,therender}) {
    const { token } = useContext(SignInUserInfo)
    const AppoveCar = async () => { 
        try {
            const response = await fetch(`http://localhost:4242/vehicles/${car_ID}/approved`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
            })
            //console.log('this response after do approve')
            exit(0)
            therender(Math.render())

        }
        catch (e) {
            console.log('can not approve car with api in carCard component.')
        }
    }
    const DeclineCar = async() => { 
         try {
            const response = await fetch(`http://localhost:4242/vehicles/${car_ID}/declined`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
            })
             //console.log('this response after do not approve')
             exit(0)
             therender(Math.render())

        }
        catch (e) {
            console.log('can not decline car with api in carCard component.')
        }
    }
    return (
      <div className='sectionCarCard'>
            <div className='AllcarCard'>
                    <span className='exit' onClick={()=>exit(0)}>X</span>
                <h2 className='numberCard'>{number}</h2>                
                <div className='img-style'>
                    {console.log('image in approve car is:',img_)}
                    <img src={`../../../../../final/uploads/cars/${img_}`} alt="car image" />
                    {/* {  <img src={img} alt="car image" />} */}
                </div>
                <div className='carInfo'>
                    <div className='one-data'>
                            <h3 >  < BsPersonVcard  className='icon'/>الرقم القومي:</h3>
                        <p>{nationalID}</p>
                        </div>
                        <div className='one-data' >
                            <h3> < BiTimeFive  className='icon'/>تاريخ بدايه الرخصه: </h3>
                        <p>{licenseCreateDate}</p>
                        </div>
                        <div className='one-data'>
                            <h3> < BiTimeFive className='icon' />تاريخ نهايه الرخصه:</h3>
                          <p>{licensEexpiredDate}</p>
                        </div>
                            <div className='one-data'>
                                <h3> < ImInsertTemplate className='icon' /> رقم العربيه:</h3>
                                 <p> {car_ID}</p>
                            </div>
                            <div className='one-data'>       
                            <h3>  <MdColorLens   className='icon'/>اللون:</h3>
                               <p>{ color_}</p>
                                </div>
                            <div className='one-data' >
                                <h3 >  < MdLocationCity   className='icon'/>وحده مرور:</h3>
                              <p> {passageUnit}</p>
                            </div>
                            <div className='one-data' >
                                <h3>  < BsCalendar2Date  className='icon'/>تاريخ التصنيع: : </h3>
                              <p>{manufactureringYear}</p>
                                </div>
                            <div className='one-data'>
                                <h3>   < AiOutlineCar  className='icon'/>النوع :</h3>
                                <p> {vehicleClass}</p>
                            </div>
                            <div className='one-data' >
                                <h3>    < AiOutlineCar className='icon' />المودل:</h3>
                                  <p>{ car_Type}</p>
                                </div>
                    

                        <div className='accept-refuse-btn'>
                            <Button className='btn-accept' onClick={AppoveCar}>موافقه</Button>
                            <Button className='btn-refused' style={{ backgroundColor: 'red' }} onClick={DeclineCar}>رفض</Button>
                        </div>
                </div>
                    </div>
            </div>
  )
}































































/*
import React from 'react'
import './Style.css'
import car8 from '../../../images/car8.jpeg'
import { Button } from 'react-bootstrap'
import { BsPersonVcard } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import { ImInsertTemplate } from 'react-icons/im'
import { MdColorLens } from 'react-icons/md'
import { MdLocationCity } from 'react-icons/md'
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
export default function CarCard() {
    return (
      <div className='sectionCarCard'>
            <div className='AllcarCard'>
                <h2 className='numberCard'>1</h2>
                <div className='img-style'>
                    <img src={car8} alt="car image" />
                </div>


                <div className='carInfo'>
                    

                <div className='d-flex align-items-center justify-content-between ' style={{width:'50%'}}>
                        <h3 className='first-data'>  < BsPersonVcard  className='icon'/>الرقم القومي:</h3>
                        <p>30012012300975</p>
                    </div>
                    <div className='d-flex align-items-center justify-content-between ' style={{width:'50%'}}>
                        <h3 className='first-data'> < BiTimeFive  className='icon'/>تاريخ بدايه الرخصه: </h3>
                        <p>1/12/2022</p>
                    </div>
                    <div className='d-flex align-items-center justify-content-between ' style={{width:'50%'}}>
                        <h3 className='first-data'> < BiTimeFive className='icon' />تاريخ نهايه الرخصه:</h3>
                        <p>1/12/2025</p>
                    </div>


                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-between ms-5' style={{width:'40%'}}>
                          
                            <h3 className='second-data'> < ImInsertTemplate className='icon' /> رقم العربيه:</h3>
                            <p> آ س د ٤ ٢ ١</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between px-5' style={{width:'40%'}}>
                           
                         <h3>  <MdColorLens   className='icon'/>اللون:</h3>
                            <p>احمر</p>
                            </div>
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-between ms-5' style={{width:'40%'}}>
                           
                            <h3 className='second-data'>  < MdLocationCity   className='icon'/>وحده مرور:</h3>
                            <p> الفيوم</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between px-5' style={{width:'40%'}}>
                           
                            <h4 style={{width:'200px'}}>  < BsCalendar2Date  className='icon'/>سنه التصنيع: </h4>
                            <p>2010</p>
                            </div>
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center justify-content-between ms-5' style={{width:'40%'}}>
                        
                            <h3 className='second-data'>   < AiOutlineCar   className='icon'/>النوع :</h3>
                            <p> خاصه</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between px-5' style={{width:'40%'}}>
                         
                            <h3>    < AiOutlineCar className='icon' />المودل:</h3>
                            <p>BMW</p>
                            </div>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <Button className='btn-accept' style={{}}>موافقه</Button>
                        <Button className='btn-refused' style={{ backgroundColor: 'red' }}>رفض</Button>
                    </div>
                </div>
                    </div>
            </div>
  )
}
 */