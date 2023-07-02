
import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Style.css'
import 'react-awesome-reveal'
import SignIn from '../../pages/SignIn'
import { Zoom } from 'react-awesome-reveal'
import { Link } from 'react-router-dom'
import Animation from '../SharedComponent/Animation/Animation'
export default function SignUp() {
    const [name, setname] = useState('')
    const [phone, setphonae] = useState(0)
    const [nationalId, setnationalId] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddres] = useState('')
    const [carId, setcarId] = useState('')
    const [password, setPassword] = useState('')
    const [confimPassword, setconfimPassword] = useState('')

    const clearData = () => {
        setname('')
        setphonae(0)
        setnationalId('')
        setemail('')
        setaddres('')
        setcarId('')
        setPassword('')
        setconfimPassword('')
    }
    const saveuUerData = () => {
         console.log('i recive data now')
         try {
            const sendSignUpData = async ()=>
            {
                const res = await fetch('http://localhost:4242/users/', {
                    headers: {
                     'Content-Type': 'application/json' // Specify the content type as JSON
                  },
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            user_name:name,
                            user_ssn:nationalId,
                            manufacturer_number:carId,
                            user_email:email,
                            user_password:password,
                            user_address:address,
                            user_job:"student",
                            user_nationality:"Egyptian",
                            user_phone:phone,
                            user_bd:"1-12-2000",
                            user_governorate:"fayoum"
                    }
                    )
                }
                )
                console.log('this is response:', res.json())
                clearData()
            }
            sendSignUpData()
        }
        catch(e) {
            console.log('not send data to api::..')
        }
        
    }


    const checkAndSend = (e) => {
        e.preventDefault()
        if (password !== confimPassword) {
            setPassword('')
            setconfimPassword('')
            window.alert('الباسود غير متطابق')
        }
        else if (name === '')
            window.alert('يجب عليك ادخال الاسم')
        else if (phone ===  "")
            window.alert('يجب عليك ادخال رقم التلفون')
        else if (nationalId === '' && nationalId.length ===14)
            window.alert('يجب عليك ادخال الرقم القومي صحيح')
        else if (email === '')
            window.alert('يجب عليك ادخال الاميل')
        else if (address === '')
            window.alert('يجب عليك ادخال العنوان')
        else {
            saveuUerData()
            console.log('i send data now')
        }    
   }

    
    return (
      //signup page --> divide it
        <div className='body-color'>
            <Container>
              <Animation/>
              <Row className='justify-content-center'>
                    <Col sm='6' className='d-flex justify-content-center'>
                        <div className='d-flex flex-column'>
                            <h2> انشاء حساب جديد </h2>
                                <p>  لديك حساب بالفعل؟
                                   <Link to={'/SignIn'}><a href='#'> تسجيل الدخول</a></Link> 
                                </p> 
                        </div>
                    </Col>
                </Row>
                <Zoom>
              <div className='signupBox my-3'>
                  <form>
                      <Row className='rowStyle'>
                           <Col lg='6' sm='12' >
                               <label>الاسم</label>
                              <input type='text' value={name} onChange={(e)=>setname(e.target.value)} placeholder='ادخل اسمك' />
                           </Col>
                          <Col lg='6' sm='12' >
                                  <label>الرقم القومي</label>
                                  <input type='number'value={nationalId} onChange={(e)=>setnationalId(e.target.value)} placeholder='ادخل الرقم القومي' /> 
                           </Col>
                         
                      </Row>
                      <Row className='rowStyle'>
                           <Col lg='6' sm='12' >
                               <label>رقم المصنع</label>
                               <input type='text'value={carId} onChange={(e)=>setcarId(e.target.value)} placeholder='ادخل رقم المصنع' />
                           </Col>
                          <Col lg='6' sm='12' >
                                  <label>الايميل</label>
                                  <input type='Gmail'value={email} onChange={(e)=>setemail(e.target.value)} placeholder='ادخل الايميل' /> 
                           </Col>
                         
                      </Row>


                       <Row className='rowStyle'>
                           <Col lg='6' sm='12' >
                               <label>العنوان</label>
                               <input type='text' value={address} onChange={(e)=>setaddres(e.target.value)} placeholder='ادخل العنوان' />
                           </Col>
                          <Col lg='6' sm='12' >
                                   <label>التلفون</label>
                                  <input type='phone' value={phone} onChange={(e)=>setphonae(e.target.value)} placeholder='ادخل التلفون' />   
                           </Col>
                         
                      </Row>
                      <Row className='rowStyle'>
                           <Col lg='6' sm='12' >
                               <label>الرقم السري</label>
                              <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='ادخل الرقم السري' />
                           </Col>
                          <Col lg='6' sm='12' >
                                  <label>تاكيد الرقم السري</label>
                                  <input type='password' value={confimPassword} onChange={(e)=>setconfimPassword(e.target.value)} placeholder='ادخل الرقم السري مره اخري' />
                           </Col>
                         
                      </Row>
                      <Row className='d-flex justify-content-center'>
                          <Col sm='4'lg='3' >
                                    <button onClick={checkAndSend} >انشاء</button>
                                    {/* {notify('اكمل البينات')} */}
                          </Col>
                         
                      </Row>
                      
                      
                   </form>
              </div>
             </Zoom>
          </Container> 
    </div>
  )
}

