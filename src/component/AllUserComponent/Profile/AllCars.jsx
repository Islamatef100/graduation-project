import React, { useState, useEffect } from 'react';
import Car from './Car';
import Animation from '../../SharedComponent/Animation/Animation'
import { type } from '@testing-library/user-event/dist/type';
export default function AllCars({ user_id, tokens }) {
  const [isLoad, setIsLoad] = useState(0);
  const [carRes, setCarRes] = useState(null);
  useEffect(() => {
    const getCars = async () => {
      try {
        const cars = await fetch(`http://localhost:4242/vehicles/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens}`
          },
        });

        const carData = await cars.json();
        setCarRes(carData);
        setIsLoad(1);
        console.log('your type response cars is:..', typeof carData);
        console.log('your response cars is:..', carData);
      } catch (e) {
        console.log('can not get your cars', e);
      }
    };

    getCars();
  }, []);

  return (
    <div className='text-center py-5 body-color' style={{minHeight:'600px'}}>
      <h1 style={{ color: 'teal', paddingTop: '50px' }}> السيارات التي تمتلكها</h1>
      <div className='cars-sections'>
        {
          isLoad === 1 ? carRes.vehicles.length === 0 ? <p>انت لا تمتلك اي سياره..</p> : carRes.vehicles.map((item, index) => {
            // to prevent display car not approved
            if (item.checked !== 'waiting')
               return <Car vicleClass={item.vehicle_class} vicleColor={item.color} vicleId={item.vehicle_id} model={item.model} key={index} />
          }) :  <Animation /> 
        }
      </div>
    </div>
  );
}





























