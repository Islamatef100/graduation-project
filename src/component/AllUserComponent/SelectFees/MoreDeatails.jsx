import React from 'react'
import { Button } from 'react-bootstrap'
import './Style.css'
import { Bounce } from 'react-awesome-reveal'
import { MdPlace } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { BsCalendar2Date } from 'react-icons/bs'
import { AiOutlineCreditCard } from 'react-icons/ai'
export default function MoreDeatails({ ShowOrNot, notify, theImage,TransID,UserSSN,theToken ,transactionTime}) {
  console.log('from more details path is:',theImage)
  const DoReport = () => {
    try {
      const ReportTransaction = async () => {
        const Response = await fetch(`http://localhost:4242/transactions/${UserSSN}/report/${TransID}`, {
          method: 'PATCH',
          headers:
          {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${theToken}`
          },
        })
        console.log('response report transaction is:,', Response.json())
      }
      ReportTransaction()
    }
    catch (e) {
      console.log('report transaction in {MoreDetails} not work..')
    }
    notify('لقد تم تقديم طلبك', 'success');
    ShowOrNot(false) 
  }
  return (
    <Bounce>
       <div className='ShowImage'>
        <div className='car'>
          {/* <img src={theImage} alt='the real image not found now'/> */}
                     <div className='d-flex justify-content-between'>
                        <h2> < BiTime color='teal' style={{marginLeft:'10px'}} />التوقيت</h2>
                    <p style={{color:'white'}}>{transactionTime}</p>
                     </div>
          <div  className='btns-img'>
            <Button style={{backgroundColor:'teal',marginLeft:'30px'}} className='btn-img' onClick={DoReport}>تقديم الشكوي</Button>
            <Button style={{backgroundColor:'teal'}}  onClick={() =>ShowOrNot(false)} className='btn-img'> الغاء</Button>
          </div>
          </div>
    
       </div>
    </Bounce>
  )
}
