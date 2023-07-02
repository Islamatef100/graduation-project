import React, { useState, useContext } from 'react';
import { SignInUserInfo } from '../../../component/CenterData/UseContextData';
import './Style.css';
import { Button } from 'react-bootstrap';
import vehicle from '../../../images/vehicle.png'
import { toast } from 'react-toastify';
export default function MyCarStolen({ exit }) {
    const [StolenDetails, setStolenDetails] = useState(0);
    const [stolenCarId, SetStolenCarId] = useState('')
    const [borderColor, setBordrColor] = useState(null)
    const {token,user_ssn}  = useContext(SignInUserInfo)
    const  CarTracks = async(e) => {
        if (stolenCarId !== '') {
            try {
                const response = await fetch(`http://localhost:4242/vehicles/${user_ssn}/${stolenCarId}/stolen`, {
                    method: 'PATCH',
                   headers: {
                            'Content-Type': 'application/json' ,// Specify the content type as JSON
                            'Authorization': `Bearer ${token}`
                        },
                
                })
                console.log(response)
                console.log('the car number also is: ', stolenCarId)
                setBordrColor(null)
                toast.success(' لقد تم طلبك بنجاج')
                exit(0)
            }
            catch (e) {
                console.log('can not make it stolen in stolen car:')
                
            }
        }
        else {
            setBordrColor('red')
        }
    }
  
    return (
        <div className='stolen_car_section'>
            <div className='StolendDetails'>
                <h1 onClick={() => exit(0)}>X</h1>
                {StolenDetails === 0 ? (
                    <div className='firstOut_StolnCar'>
                        <p>تآكد من سرقه السياره قبل اجراء هذه الخطوه وهذه الخطوه  ليست الا تنبيه النظام عندما يتعرف علي سيارتك يقوم بتسجبل تلك البينات لذلك يجب عليك اتخاد الاجراءات القانونيه في اسرع وقت</p>
                        <Button onClick={() => setStolenDetails(1)} style={{ width: '200px',fontSize:'25px' }}>التالي</Button>
                    </div>
                ) : (
                     <div className='firstOut_StolnCar'>
                         <img src={vehicle} style={{maxWidth:'250px',maxHeight:'160px'}}/>
                        <form>
                            <label> رقم لوحه السياره </label>
                                <input type='text' style={{borderColor:`${borderColor}`}} placeholder='ادخل رقم لوحه الساره المفقوده'  value={stolenCarId} onChange={(e)=>SetStolenCarId(e.target.value)}/>
                                <Button  className='btn-stolenCar-form' onClick={CarTracks} style={{ width: '200px',fontSize:'25px' }}>تتبع السياره</Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
