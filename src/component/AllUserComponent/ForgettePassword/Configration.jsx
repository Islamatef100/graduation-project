import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './style.css'
import { Link } from 'react-router-dom'
import { Zoom } from 'react-awesome-reveal'
export default function Configration({ fun }) {
  const RePass = () => {
    // here check and reset password.
    fun('تم تغيير كلمه السر')
      setTimeout(()=> <Link to={'/SignIn'}/>,1000)
   
  }
  return (
      <div className='body-colorRP'>
          <Container >
               <Row className='py-2 justify-content-center'>
                    <Col sm='6' className='d-flex justify-content-center'>
                        <div className='d-flex flex-column'>
                            <h2>تآكيد كلمه السر</h2>
                        </div>
                    </Col>
              </Row>
            <Zoom>
              <Row className='justify-content-center'>
                  <Col sm='4' className='signinboxRP'>
                      <form className='formStyleRP'>
                          <label> كلمه السر</label>
                <input type='password' placeholder='ادخل كلمه السر الجديده' />
                          <label> تآكيد كلمه السر</label>
                <input type='password' placeholder=' اعد ادخال كلمه السر' />
                
                          <Link to={'/SignIn'}><button onClick={RePass} className='btnRP'> تآكيد </button></Link>
                      </form>
                  </Col>
                      
                  </Row>
             </Zoom>
          </Container>
         
      </div>
  )
}
