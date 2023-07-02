import SectionContactUs from '../component/AllUserComponent/ContactUs/SectionContactUs';
import { React, useContext } from 'react';
import { SignInUserInfo } from '../component/CenterData/UseContextData';
import NotSignIn from '../component/SharedComponent/NotSignIn';
import Animation from '../component/SharedComponent/Animation/Animation';
export default function ContactUs() {
  const {user,admin} = useContext(SignInUserInfo)
  return (
    <>
      {user ? <SectionContactUs /> : admin ? <><h1 className='p-5 w-100 text-center' style={{
            color:'red',marginTop:'100px',height:'80vh'
          }}>هذا المكان مخصص للسمتخدم العادي  <Animation /> </h1></> : <NotSignIn /> }
    </>
  )
}
