import { React,useContext} from 'react'
import '../../../src/index.css'
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Logo from'../../images/logo.png'
import './Style.css'
import { Button, NavDropdown } from 'react-bootstrap';
import { SignInUserInfo } from '../CenterData/UseContextData';
import { toast } from 'react-toastify';
import { AiOutLineMenu } from "react-icons/ai";
export default function Header() {
  const {setUserExistOrNot, funAdmin, user, admin} = useContext(SignInUserInfo)
  return (
      <div className='Allhead'>
            <div className='header container'>
        <NavLink to={'/home'}> <img className='logo-style' src={Logo} alt="" />  </NavLink>
    
        <div className='navebar'>  
          {
            user || admin
              ? <NavLink className='switchInMobile' to={'/home'} onClick={() => { localStorage.removeItem('userGraduationProject'); setUserExistOrNot(0); funAdmin(0); toast.success(' تم الخروج من حسابك') }}> <Button style={{padding:'10px'}}>تسجيل الخروج</Button></NavLink>
              : <NavLink to={'/signin'} className='switchInMobile'> <Button style={{padding:'10px'}}>تسجيل الدخول</Button></NavLink>
          }
          {
            user || admin ? null :  <NavLink to={'/SignUp'} className='switchInMobile'><Button style={{padding:'10px'}}>انشاء حساب </Button></NavLink>
          }
           <NavDropdown
              id="nav-dropdown-dark-example"
              title="  المزيد "
              menuVariant="dark"
              color='white'
          >
            <NavDropdown.Item>   <NavLink to={'/signin'} className='switchInMobilemenue'>تسجيل الدخول</NavLink></NavDropdown.Item> 
            <NavDropdown.Item> <NavLink to={'/SignUp'} className='switchInMobilemenue'>انشاء حساب</NavLink></NavDropdown.Item> 
          
            <NavDropdown.Item ><NavLink to={'/Payment'} >الدفع</NavLink></NavDropdown.Item>
            <NavDropdown.Item ><NavLink to={'/history'} >جميع المدفوعات</NavLink></NavDropdown.Item>
            <NavDropdown.Item> <NavLink to={'/ContactUs'}>التواصل معنا</NavLink></NavDropdown.Item> 
          
            {/* here do logic of sign out. */}
            <NavDropdown.Item onClick={() => { localStorage.removeItem('userGraduationProject'); setUserExistOrNot(0);funAdmin(0);toast.success(' تم الخروج من حسابك') }}>  <NavLink to={'/home'}> تسجيل الخروج</NavLink> </NavDropdown.Item> 
          
          </NavDropdown>
          <Link to={'/Profile'}>
               <FontAwesomeIcon icon={faUserCircle} className='ProfileIcon' />          
          </Link>
        </div>
      </div>
      </div>
  
  )
}
