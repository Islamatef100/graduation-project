import React, { useContext } from 'react';
import ProfileSlider from '../component/AllUserComponent/Profile/ProfileSlider';
import AllCars from '../component/AllUserComponent/Profile/AllCars';
import NotSignIn from '../component/SharedComponent/NotSignIn';
import { SignInUserInfo } from '../component/CenterData/UseContextData';
import Services from '../component/AllUserComponent/Profile/Services';
import DashBoard from '../component/AllAdminComponent/DashBoard/DashBoard';
export default function ProfilePage() {
  const { user, user_ssn, token,admin } = useContext(SignInUserInfo);

  return (
    <div>
      {admin ? <DashBoard />:user ? (
        <div>
          <ProfileSlider />
          <AllCars user_id={user_ssn} tokens={token} />
          <Services />
        </div>
      ) : (
        <NotSignIn />
      )}
    </div>
  );
}
