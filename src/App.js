import './index.css';
import Header from './component/Header/Header'
import React from 'react';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Error from './pages/Error';
import SignIn from './pages/SignIn';
import SignUpPage from './component/SignUp/SignUp'
import ContactUs from './pages/ContactUs'; 
import ForgettePassword from './pages/ForgettePasswordPage';
import Configration from './component/AllUserComponent/ForgettePassword/Configration';
import ValidCode from './component/AllUserComponent/ForgettePassword/ValidCode';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext } from 'react';
import Footer from './component/Footer/Footer';
import HistoryPage from './pages/History';
import { SignInUserInfo } from './component/CenterData/UseContextData';
function App() {
 // i try to restore user.
  const { setUserExistOrNot, changeUserSnn, funSetToken ,funAdmin} = useContext(SignInUserInfo)

  useEffect(() => {
    if (localStorage.getItem('userGraduationProject') !== null) {
      try {
         const userData = localStorage.getItem('userGraduationProject');
        const finalUserData = JSON.parse(userData);
        //console.log('test at local storage: ', finalUserData)
         changeUserSnn(finalUserData.user_ssn_storage);
        funSetToken(finalUserData.tokens_storage);
        if (finalUserData.AdminOrUser === 'admin') {
          funAdmin(1)
          console.log('{ in app.js } => i found it admin')
        }
        else  if (finalUserData.AdminOrUser === 'user'){
           setUserExistOrNot(1)
           console.log('{ in app.js } => i found it user')      
        }
      }
      catch (e) {
        console.log('error in find user in local storage.')
      }
   
  }
}, []);
  
  
  const notify = (message, type) => {
      if(type==='error')
        toast.error(message)
      else
        toast.success(message)
  }
  
  return (
    <>
      
      {/* npm install --save react-toastify */}
      
      {/* https://fkhadra.github.io/react-toastify/installation
      notification. */}
        
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/Payment' element={<Payment notify={notify} />} />
          <Route path='/SignIn' element={<SignIn/>} />
          <Route path='/SignUp' element={<SignUpPage/>} /> 
          <Route path='/ContactUs' element={<ContactUs />} /> 
          <Route path='/ResetPassword' element={<ForgettePassword />} />
          <Route path='/SignIn/ResetPassword/ConfirmPassword' element={<Configration fun={notify} />} />
          <Route path='/SignIn/ResetPassword/ValidCode' element={<ValidCode />} />
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='*' element={<Error/>} /> 
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;


// funcrtion(initial value,action)
// {
//   switch (action.type)
//   case ...:
  
// }
// const[value,dispatch] = useReducer(function,initialvalue){

// }
// dispatch(type:.....)
// dispatch as setvalue in useState here set type of operation.


/*
axios
*/
//  xmlhttprequist --> newproise to use then and catch and also use code xmlhttorquist to call api --> fetch() is function have newpromise and contain xmlhttprequist