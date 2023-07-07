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
import { toast } from 'react-toastify';
import imgCard from '../../../images/imgCard.jpg'
import React, { useContext, useState } from 'react'
// import { img } from '../../../../../355654084_570207801946753_1817848671160769477_n.jpg'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function StolenCarCard({exit,number, nationalID, car_ID, car_Type, img_, color_, manufactureringYear, licenseCreateDate, licensEexpiredDate, vehicleClass,passageUnit,therender}) {
    const { token } = useContext(SignInUserInfo)
    // const [update,setUpdte] = useState(0)
       const FoundCar = async(car_ID,nationalID)=> {
        try {
            const response = await fetch(`http://localhost:4242/vehicles/${nationalID}/${car_ID}/safe`, {
            method: 'PATCH',
            headers: {
                        'Content-Type': 'application/json' ,// Specify the content type as JSON
                        'Authorization': `Bearer ${token}`
                    },
            
            })
            console.log(response)
            console.log('the car number also is: ', car_ID)
            toast.success(' لقد تم الغاء تتبع السياره')
            // setUpdte( setUpdte(Math.random()))
            exit(0)
    }
    catch (e) {
        console.log('can not make it stolen in stolen car:')
        
    }
    }
        
    return (
      <div className='sectionCarCard'>
            <div className='AllcarCard'>
                    <span className='exit' onClick={()=>exit(0)}>X</span>
                <h2 className='numberCard'>{number}</h2>                
                <div className='img-style'>
                    <img src={imgCard} alt="car image not found" />
                </div>
                <div className='carInfo'>
                    <div className='one-data'>
                            <h3 >  < BsPersonVcard  className='iconmenue'/>الرقم القومي:</h3>
                        <p>{nationalID}</p>
                        </div>
                        <div className='one-data' >
                            <h3> < BiTimeFive  className='iconmenue'/>تاريخ بدايه الرخصه: </h3>
                        <p>{licenseCreateDate}</p>
                        </div>
                        <div className='one-data'>
                            <h3> < BiTimeFive className='iconmenue' />تاريخ نهايه الرخصه:</h3>
                          <p>{licensEexpiredDate}</p>
                        </div>
                            <div className='one-data'>
                                <h3> < ImInsertTemplate className='iconmenue' /> رقم العربيه:</h3>
                                 <p> {car_ID}</p>
                            </div>
                            <div className='one-data'>       
                            <h3>  <MdColorLens   className='iconmenue'/>اللون:</h3>
                               <p>{ color_}</p>
                                </div>
                            <div className='one-data' >
                                <h3 >  < MdLocationCity   className='iconmenue'/>وحده مرور:</h3>
                              <p> {passageUnit}</p>
                            </div>
                            <div className='one-data' >
                                <h3>  < BsCalendar2Date  className='iconmenue'/>تاريخ التصنيع: : </h3>
                              <p>{manufactureringYear}</p>
                                </div>
                            <div className='one-data'>
                                <h3>   < AiOutlineCar  className='iconmenue'/>النوع :</h3>
                                <p> {vehicleClass}</p>
                            </div>
                            <div className='one-data' >
                                <h3>    < AiOutlineCar className='iconmenue' />المودل:</h3>
                                  <p>{ car_Type}</p>
                                </div>
                    

                        <div className='accept-refuse-btn d-flex justify-content-center'>
                            <Button className='btn-refused' style={{padding:'10px',fontSize:'1.5rem'}} onClick={()=>FoundCar(car_ID,nationalID)}>الغاء تتبع السياره</Button>
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