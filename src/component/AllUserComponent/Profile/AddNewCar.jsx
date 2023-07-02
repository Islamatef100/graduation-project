import {React, useState,useContext } from 'react'
import { Button } from 'react-bootstrap'
import { GiCctvCamera } from 'react-icons/gi';
import { FaCarSide } from "react-icons/fa"
import { SignInUserInfo } from '../../../component/CenterData/UseContextData';
import { toast } from 'react-toastify';
export default function AddNewCar({ exit }) {
    const {user_ssn, token} = useContext(SignInUserInfo)
    const [careImage, setImage] = useState(null);
    const [car_id,setCar_id] = useState(null)
    const [car_type,setCare_type] = useState(null)
    const [car_model,setcare_model] = useState(null)
    const [car_color,setCare_color] = useState(null)
    const [car_data_manufactor, setCare_manufactur] = useState(null)
    const [car_license_create_date, set_license_create_date] = useState(null)
    const [car_license_end_date, set_license_end_date] = useState(null)
    const storeImage = (e) => {
     setImage(e.target.files[0]);   
    }
    const clearForm = () => {
        setImage(null)
        setCar_id(null)
        setCare_type(null)
        setcare_model(null)
        setCare_color(null)
        setCare_manufactur(null)
        set_license_create_date(null)
        set_license_end_date(null)
    }
    const storCar = (e) => {
        // must makesure data entered.
        // set_user_id(user_ssn)
        e.preventDefault()
        // send data to backend.
        try {
            //-------------------------------------
                const createCare = async () => {
                    const responseAddCar = await fetch(`http://localhost:4242/vehicles/${user_ssn}/addCar`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' ,// Specify the content type as JSON
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ // Stringify the body object
                            vehicle_id: car_id,
                            license_id: user_ssn,
                            vehicle_class: car_type,
                            traffic_unit: "egypt",
                            model: car_model,
                            manufacturering_year: car_data_manufactor,
                            color: car_color,
                            image: careImage,
                            license_create_date: car_license_create_date,
                            license_expired_date: car_license_end_date,
                            manufacturer:car_model  
                        })
                    });   
                    console.log('respons add care is :', responseAddCar.json())
                    console.log('the license is:',user_ssn)
                         clearForm()
                         exit(0)
                         toast.success('لقد تم طلبك بنجاح')
                    
                };
            createCare();

            }
            catch (e) {
                console.log('error in send care data to backend');
            }
    }
    return (
        <div className='addUserSection' >
            <form className='formAddCar'>
                <h1 onClick={() => exit(0)}>X</h1>
                <div className='d-flex align-items-center'>
                    <FaCarSide fontSize='8rem' color='blue' className='NewcarIcon' />
                    <GiCctvCamera fontSize='2rem' color='red' className='ms-4' />
                </div>
                    <h2>قم باضافه بينات السياره</h2>
                    <label> رقم الوحه</label>
                <input type='text' placeholder='ادخل رقم الوحه' value={car_id ||''} onChange={(e) => setCar_id(e.target.value)} />
                
                    <label> نوع العربيه</label>
                    <input type='text' placeholder='ادخل نوع العربيه' value={car_type||''} onChange={(e)=>setCare_type(e.target.value)} />
                    <label>موديل العربيه </label>
                    <input type='text' placeholder='ادخل موديل العربيه' value={car_model ||''} onChange={(e)=>setcare_model(e.target.value)} />
                    <label>الون</label>
                    <input type='text' placeholder='ادخل الون ' value={car_color ||''} onChange={(e)=>setCare_color(e.target.value)} />

                <div className='d-flex'>
                    <div>
                        <label>سنه التصنيع</label> 
                         <input type='number'  placeholder='ادخل سنه التصنيع' value={car_data_manufactor ||''} onChange={(e)=>setCare_manufactur(e.target.value)}/>
                    </div>
                    <div className='me-5'>
                         <label className=''>صوره السياره</label>
                        <input type='file' name='image' className='' onChange={storeImage}   style={{border:'1px solid black', width:'80%'}} />    
                    </div>
                </div>
                <div className='d-flex'>
                    <div >
                            <label> تاريخ بدايه الرخصه</label>
                           <input type='text' placeholder='ادخل تاريخ بدايه الرخصه' value={car_license_create_date ||''} onChange={(e) => set_license_create_date(e.target.value)} />
                    </div>
                    <div className='me-5'>
                         <label>تازيخ انتهاء الرخصه</label>
                         <input type='text' placeholder='ادخل تاريخ نهايه الرخصه' value={car_license_end_date ||''} onChange={(e) => set_license_end_date(e.target.value)}  style={{}} />
                    </div>
                 </div>
                    <Button  style={{fontSize:'25px',borderRadius:'10px',width:'200px'}} onClick={storCar}>اضافه</Button>
                </form>
        </div>
        
  )
}
