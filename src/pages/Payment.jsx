import React from 'react'
import SelectFees from '../component/AllUserComponent/SelectFees/SelectFees'
import { useContext } from 'react'
import { SignInUserInfo } from '../component/CenterData/UseContextData'
import NotSignIn from '../component/SharedComponent/NotSignIn'
import Animation from '../component/SharedComponent/Animation/Animation'
export default function Payment({ notify }) {
  const {user,admin} = useContext(SignInUserInfo)
  return (
    <>
      {user ? <SelectFees notify={notify} />: admin ?<> <h1 className='p-5 w-100 text-center' style={{
            color:'red',marginTop:'100px'
          }}>هذا المكان مخصص للسمتخدم العادي</h1> <Animation /> </> : <NotSignIn />}
    </>
  )
}
