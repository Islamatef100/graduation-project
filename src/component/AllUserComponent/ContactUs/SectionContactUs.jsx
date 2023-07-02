import './Style.css'
import React, { useState } from 'react';
export default function SectionContactUs() {
  const [problem, setProblem] = useState('')
  const handleSubmit = (e) => {
      e.preventDefault()
      setProblem('')
      // send problm to backend..
  }

  return (
      <div className='body-color d-flex justify-content-center'>
               <form onSubmit={handleSubmit} className='formproblem'>
                <h3>قم بادخال مشكلتك وسوف يتم الرد عليك في اسرع وقت..</h3>  
                  <textarea className='inputProblem' value={problem} onChange={(event)=>setProblem(event.target.value)}/>
                  <button className='btnStyle d-block' type='submit' >ارسال</button>
            </form>
  </div>
  )
}
