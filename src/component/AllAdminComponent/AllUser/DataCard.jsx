import React from 'react'
import './Style.css'
import { CgProfile } from "react-icons/cg";
import { BsCardText } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlinePhone } from 'react-icons/ai'

export default function DataCard({name,phonNumber,nationalId,address,email,number}) {
  return (
      <div className='All-Card'>
          <div className='d-flex'>
              <div>
                    <CgProfile fontSize='4rem' style={{marginLeft:'20px',color:'teal'}}/>
              </div>
              <div>
                  <h2>{name}</h2>
                  <div style={{color:'#285EBE'}}>
                      <AiOutlinePhone fontSize='1.2rem' style={{marginLeft:'7px'}}/>{phonNumber}
                  </div>
              </div>
          </div>
          <h2 style={{color:'#285EBE',marginRight:'43px'}}>البينات</h2>
          {/* <div className='card-body'> */}
              <div className='d-flex'>
                  <BsCardText fontSize='1.5rem' style={{marginLeft:'20px',color:'teal'}}/>
                  <div>
                         <div style={{color:'#285EBE'}}>رقم القومي</div>
                         <div>{nationalId}</div>
                  </div>
              </div>
              <div className='d-flex'>
                  <CiLocationOn fontSize='1.5rem' style={{marginLeft:'20px',color:'teal'}}/>
                  <div>
                      <div style={{color:'#285EBE'}}> العنوان</div>
                  <div>{address}</div>
                  </div>
          </div>
           <div className='d-flex'>
                  <AiOutlineMail fontSize='1.5rem' style={{marginLeft:'20px',color:'teal'}}/>
                  <div>
                      <div style={{color:'#285EBE'}}> الاميل</div>
                  <div>{email}</div>
                  </div>
              </div>
          </div>
    // </div>
  )
}
