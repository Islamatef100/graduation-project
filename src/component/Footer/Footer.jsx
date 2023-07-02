import React from 'react'
import './FooterStyle.css'
import { Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { FaLinkedinIn } from 'react-icons/fa'
export default function Footer() {
    return (
        <div className='footer'>
            <div className='container footerSection'>
                <Link to={'/home'} style={{ color: 'white', textDecoration: 'none' }}><p className='logo'> <span className='charFooter'>F</span>ast<span className='charFooter'>R</span>oad</p></Link> 
                <p className='icons'>
                    <a href='https://github.com/Islamatef100/graduation-project' target='_blank'>< AiFillGithub className='icon' /></a> 
                    <a href='https://www.linkedin.com/in/islam-atef-0b64a91a7/' target='_blank'>< FaLinkedinIn className='icon'/></a> 
                    <a href='https://www.facebook.com/profile.php?id=100086088181401' target='_blank'> < BsFacebook className='icon'/></a> 
                </p>
                <p> @ حقوق الملكيه لدي<a className='fcai' href='https://www.facebook.com/fciFym' target='_blank'  style={{color:'red',cursor:'pointer'}}> FCAI </a></p>
             </div>
        </div>
  )
}
