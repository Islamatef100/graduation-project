import { MdPlace } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { BsCalendar2Date } from 'react-icons/bs'
import './Style.css'
import { AiOutlineCreditCard } from 'react-icons/ai'
import {Button } from 'react-bootstrap'
import React, {useContext } from 'react'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function CardReport({ number, time, date, address, carId,transactionID ,render}) {
    const { token } = useContext(SignInUserInfo)
    const approve = async () => {
        try {
            const response = await fetch(`http://localhost:4242/transactions/report/${transactionID}/approved`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
           // console.log('the transaction report approve response is:',response)
           render(Math.random())
        }
        catch (e) {
            console.log('can not approve transaction in carReport')
        }
    }
    const declin =async () => {
         try {
            const response = await fetch(`http://localhost:4242/transactions/report/${transactionID}/declined`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
             //console.log('the transaction report decline response is:', response)
          render(Math.random())   
          
        }
        catch (e) {
            console.log('can not approve transaction in carReport')
        }
    }
    return (
        <div className='AllCard'>
            <span className='number mb-3'>{number}</span>
               <div className='section-data'>
                    <div className='item'>
                        <h2> < AiOutlineCreditCard  color='teal' style={{marginLeft:'10px'}}/>رقم العربيه</h2>
                         <p>{ carId}</p>
                    </div>
                    <div className='item'>
                        <h2> < MdPlace color='teal' style={{marginLeft:'10px'}}/>المكان</h2>
                          <p>{address}</p>
                     </div>
                </div>
                 <div className='section-data'>
                    <div className='item'>
                        <h2>< BsCalendar2Date color='teal' style={{marginLeft:'10px'}}/>  التاريخ</h2>
                          <p>{date}</p>
                     </div>
                     <div className='item'>
                        <h2>  < BiTime color='teal' style={{marginLeft:'10px'}} />التوقيت</h2>
                    <p>{time}</p>
                     </div>
                </div>
                
            <div className='section-btns'>
                <Button onClick={approve} className='Twobtn' style={{ fontSize: '1.3rem',backgroundColor:'teal' }}>موافقه</Button>
                <Button onClick={declin} className='Twobtn' style={{backgroundColor:'red',fontSize:'1.3rem'}}>رفض</Button>
            </div>
        </div>
    );
}
