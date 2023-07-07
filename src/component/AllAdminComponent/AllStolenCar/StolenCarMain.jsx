import StolenMenueList from './StolenMenueList'
import React, { useEffect, useContext,useState } from 'react'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function StolenCarMain({searchWord}) {
  const [loading, setLoad] = useState(0)
  const [allCarsData, setCarsData] = useState(null)
  const { token } = useContext(SignInUserInfo)
  const [doRender,setDoRender] = useState(0)
  useEffect(() => { 
    try {
      const GetAllCars =async () => { 
        const Response = await fetch('http://localhost:4242/vehicles/allstolencars', {
          methods: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const AllStolenCars = await Response.json()
        setLoad(1)
        setCarsData(AllStolenCars)
        console.log('all Stolen car is: ', AllStolenCars)
      }
      GetAllCars()
    }
    catch (e) {
      console.log('gan not gett all Stolen car')
    }
  },[doRender])
  return (
    <>
       <div className='title-admin-question'>
        <h1 className=''> السيارات المسروقه</h1>
        </div>
      {loading === 1 ? allCarsData.vehicles.length === 0 ? <p className='notfound'>لا يوجد سيارات مسروقه</p>
        : allCarsData.vehicles.map((car, index) => {
          try { 
               if (searchWord === '' || car.license.includes(searchWord) || car.vehicle_id.includes(searchWord) || car.model.includes(searchWord)) {
                 return (
                   <StolenMenueList
                     key={index}
                     number={index}
                     nationalID={car.license}
                     carID={car.vehicle_id}
                     carType={car.model}
                     img={car.vehicle_image}
                     color={car.color}
                     manufacturering_year={car.manufacturering_year}
                     license_expired_date={car.license_expired_date}
                     license_create_date={car.license_create_date}
                     vehicle_class={car.vehicle_class}
                     passage_unit={car.traffic_unit}
                     render={setDoRender}
                      />
        );
        }
          }
          catch (e) {
            console.log('not found any stolen car..')
          }
      return null;
    }):<p style={{textAlign:'center',width:'100%'}}>Loading...</p>}
  </>
);

}
