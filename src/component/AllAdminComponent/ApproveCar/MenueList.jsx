import './Style.css'
import CarCard from './CarCard'
import { Col, Row } from 'react-bootstrap'
import { BsPersonVcard } from 'react-icons/bs'
import { ImInsertTemplate } from 'react-icons/im'
import { AiOutlineCar } from 'react-icons/ai'
import { useState } from 'react'
export default function MenueList({number, nationalID, carID, carType, img, color, manufacturering_year, license_create_date, license_expired_date, vehicle_class ,passage_unit,render}) {
      const [ShowRemainData,setShowData]= useState(0)
    return (
        <div className='allRow'>
        {ShowRemainData === 1 ? <CarCard
          exit={setShowData}
          number={number}
          nationalID={nationalID}
          car_ID={carID}
          car_Type={carType}
          img_={img}
          color_={color}
          manufactureringYear={manufacturering_year}
          licenseCreateDate={license_create_date}
          licensEexpiredDate={license_expired_date}
          vehicleClass={vehicle_class}
          passageUnit={passage_unit}
          therender={render}
        /> : null}
            <Row className='rowParent' onClick={() => setShowData(1)}>
                <h5 className='number'>{number}</h5>
              <Col sm='12' xs='12' lg='5' className='col'>
               <h4>  < BsPersonVcard  className='icon'/>الرقم القومي:  </h4>
                    <p>{nationalID}</p>
          </Col>
          <Col sm='12'xs='12' lg='3' className='col'>
                 <h4> < ImInsertTemplate className='icon' />رقم العربيه: </h4>
                    <p >{carID}</p>     
          </Col>
          <Col sm='12' xs='12' lg='3' className='col'>
               <h4>   < AiOutlineCar className='icon' />المودل: </h4>
                    <p>{carType}</p>
           </Col>
      </Row>
      </div>
  )
}
