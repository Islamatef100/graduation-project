import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './style.css'
import { Link } from 'react-router-dom'
import { Zoom } from 'react-awesome-reveal'
export default function ResetPassword() {
  return (
      <div className='body-colorRP'>
          <Container >
               <Row className='py-2 justify-content-center'>
                    <Col sm='6' className='d-flex justify-content-center'>
                        <div className='d-flex flex-column'>
                            <h2>تغيير كلمه السر</h2>
                        </div>
                    </Col>
              </Row>
            <Zoom>
              <Row className='justify-content-center'>
                  <Col sm='4' className='signinboxRP'>
                      <form className='formStyleRP'>
                          <label> الاميل</label>
                          <input type='email'placeholder='ادخل الاميل' />
                          <Link to={'/SignIn/ResetPassword/ValidCode'}><button className='btnRP'>ارسل كود التحقق</button></Link>
                      </form>
                  </Col>
                      
                  </Row>
             </Zoom>
          </Container>
         
      </div>
  )
}
