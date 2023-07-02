import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function NotSignIn() {
  return (
      <div  className='body-color d-flex justify-content-center'>
          <div className='NotSignIn my-3'>
              <h2 className='py-3 text-center' style={{color:'red'}}>انت لم تقم بتسجيل الدخول..</h2>
              <div className='d-flex justify-content-between NotSignIn-buttons '>
                  <Link to={'/SignIn'}><Button style={{ fontSize: '1.5rem', minWidth: '150px',marginTop:'1.5rem' }}>تسجبل الدخول</Button></Link> 
                  <Link  to={'/SignUp'}>  <Button style={{ fontSize: '1.5rem' ,marginTop:'1.5rem' }}>انشاء حساب جديد</Button></Link> 
              </div>
          </div>
    </div>
  )
}
