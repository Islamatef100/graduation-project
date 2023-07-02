import MenueList from './MenueList'
import React, { useEffect, useContext,useState } from 'react'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function ApproveCar({searchWord}) {
  const [loading, setLoad] = useState(0)
  const [allCarsData, setCarsData] = useState(null)
  const { token } = useContext(SignInUserInfo)
  const [doRender,setDoRender] = useState(0)
  useEffect(() => { 
    try {
      const GetAllCars =async () => { 
        const Response = await fetch('http://localhost:4242/vehicles', {
          methods: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const AllCars = await Response.json()
        setLoad(1)
        setCarsData(AllCars)
        console.log('all car data from approve car is: ', AllCars)
      }
      GetAllCars()
    }
    catch (e) {
      console.log('gan not gett all vihcles')
    }
  },[doRender])
  return (
    <>
      { loading === 1 ? allCarsData.map((car, index) => {
        if (car.checked === 'waiting') {
          // i do try and catch becouse some data is null and in check if contain or not get error..
          try { 
               if (searchWord === '' || car.license.includes(searchWord) || car.vehicle_id.includes(searchWord) || car.model.includes(searchWord)) {
                 return (
                   <MenueList
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
            console.log('in all waiting car this not error but data is null')
          }
      }
      return null;
    }):<p style={{textAlign:'center',width:'100%'}}>Loading...</p>}
  </>
);

}
