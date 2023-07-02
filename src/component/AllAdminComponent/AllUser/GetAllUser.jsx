import React, { useContext, useEffect, useState } from 'react';
import { SignInUserInfo } from '../../CenterData/UseContextData';
import DataCard from './DataCard';
import './Style.css'
import { Col, Row } from 'react-bootstrap';
export default function GetAllUser({searchWord}) {
  const [Alluser, setAlllUser] = useState(null);
  const [isLoad, setLoading] = useState(0);
  const { token } = useContext(SignInUserInfo);

  useEffect(() => {
    try {
      const GetAllUsers = async () => {
        const response = await fetch('http://localhost:4242/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log('all users from get all user is: ', data);
        setAlllUser(data);
        setLoading(1);
      };
      GetAllUsers();
    } catch (e) {
      console.log('error in get all user data in admin');
    }
  }, []);

  return (
    <Row className='SectionAllUserData'>
      {isLoad ? (
        Alluser.map((user, index) => {
          if (user.is_admin === 'admin')
            return null
          else if (searchWord === '' || user.user_name.includes(searchWord) || user.user_phone.includes(searchWord) ||user.user_ssn.includes(searchWord) ||user.user_address.includes(searchWord) ||user.user_email.includes(searchWord) ) {
            return <Col sm='12' lg='6'>
              <DataCard
                  key={index}
                  number={index}
                  name={user.user_name}
                  phonNumber={user.user_phone}
                  nationalId={user.user_ssn}
                  address={user.user_address}
                  email={user.user_email}
          />
            </Col>
          }
          else 
            return null
         
        })
      ) : 
        <p style={{textAlign:'center',width:'100%'}}>Loading...</p>}
    </Row>
  );
}
