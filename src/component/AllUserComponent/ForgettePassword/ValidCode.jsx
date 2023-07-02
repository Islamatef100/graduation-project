import React from 'react'
import  { useState } from 'react';
import { Link } from 'react-router-dom'
export default function ValidCode() {
  const [code1, setCode1] = useState(0);
  const [code2, setCode2] = useState(0);
  const [code3, setCode3] = useState(0);
  const [code4, setCode4] = useState(0);
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }
    // Perform validation of the code and proceed to password reset if valid
  
  return (
    <>
      <div className='body-color'>
         <h2 className='d-flex justify-content-center  formLabel'>التحقق من هويتك</h2>
        <div className='validationSection'>
         <form onSubmit={handleSubmit}>
            <label>  ادخل الكود</label>
            <div className='d-flex'>
              <input
              type="text"
              maxLength={1}
              //value={digit}
              onChange={(event) =>  setCode1(event.target.value)}
               className='inputedigit'
              />
              <input
              type="text"
              maxLength={1}
              //value={digit}
              onChange={(event) =>  setCode2(event.target.value)}
               className='inputedigit'
              />
              <input
              type="text"
              maxLength={1}
              //value={digit}
              onChange={(event) =>  setCode3(event.target.value)}
               className='inputedigit'
              />
              <input
              type="text"
              maxLength={1}
              //value={digit}
              onChange={(event) =>  setCode4(event.target.value)}
               className='inputedigit'
              />
            </div>
              
            
              {/* <input className='validCode' type="number" value={code} onChange={handleCodeChange} />   */}
             <Link to={'/SignIn/ResetPassword/ConfirmPassword'}> <button  type="submit">تحقق</button></Link> 
          </form>   
      </div>
        </div>
       
    </>
  )
}


















/*
import React from 'react'
import Configration from './Configration'
 import  { useState } from 'react';
import { Link } from 'react-router-dom'
export default function ValidCode() {

  const [code, setCode] = useState('');
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }
    // Perform validation of the code and proceed to password reset if valid
  
  return (
    <>
      <div className='body-color'>
         <h2 className='d-flex justify-content-center  formLabel'>التحقق من هويتك</h2>
        <div className='validationSection'>
         <form onSubmit={handleSubmit}>
            <label>  ادخل الكود</label>
              <input className='validCode' type="number" value={code} onChange={handleCodeChange} />  
             <Link to={'/SignIn/ResetPassword/ConfirmPassword'}> <button  type="submit">تحقق</button></Link> 
          </form>   
      </div>
        </div>
       
    </>
  )
}

*/