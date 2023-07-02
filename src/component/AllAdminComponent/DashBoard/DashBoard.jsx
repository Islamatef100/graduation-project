import './Style.css'
import React, { useState } from 'react'
import GetAllUser from '../AllUser/GetAllUser'
import ApproveCar from '../ApproveCar/ApproveCar'
import AnswerReport from '../AnswerReport/AnswerReport'
import { Button, Form } from 'react-bootstrap'
import Animation from '../../SharedComponent/Animation/Animation'
//import Animation from '../../SharedComponent/Animation'
export default function DashBoard() {
    const [whichAppear, setWhichAppear] = useState(0)
    const [searchWord,setSearchWord] = useState('')
    const getSearchWord = (e) => {
        setSearchWord(e.target.value)
    }
    return (
        <div className='AllDashPoardPage body-color'>
            <div>
                 <div className='Allmenue'>
                 <div onClick={()=>setWhichAppear(1)}>جمبع المستخدمين</div>
                 <div onClick={()=>setWhichAppear(2)}>مراجعه اضافه السيارات</div>
                 <div onClick={()=>setWhichAppear(3)}>مراجعه التظلمات</div>
            </div>
            </div>
            <div className='SelectedwhenUsMobile' >
                 <div className='Selected-component'>
                {whichAppear === 1 ||whichAppear === 2||whichAppear===3 ?
                <Form className="d-flex search-form">
                    <Form.Control
                        type="search"
                        placeholder="بحث...."
                        className="me-2 search-field"
                        style={{ margin: '0' }} // Remove margin
                        onChange={getSearchWord}    
                    />
                    {/* <Button style={{ maxWidth: '150px', marginRight: '3px' }}>بحث</Button> Adjust the margin */}
                </Form> : null}
                    {whichAppear === 0 ? <div style={{width:'80vw',textAlign:'center'}}><Animation /></div>:
                    whichAppear === 1 ?<GetAllUser searchWord={searchWord} />
                    : whichAppear === 2 ? <ApproveCar searchWord={searchWord} />
                    :whichAppear === 3 ? <AnswerReport searchWord={searchWord} />
                    : null}
             </div>
            </div>
    </div>
  )
}
