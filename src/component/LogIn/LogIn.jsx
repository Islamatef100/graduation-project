import { useEffect, React } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { SignInUserInfo } from '../CenterData/UseContextData'
import Animation from '../SharedComponent/Animation/Animation'
import Eye from '../SharedComponent/Eye/Eye'
export default function LogIn() {
    const [borderColor,setBorderColor] = useState(null)
    const navigate = useNavigate()
    const [email, setemail] = useState('')
//  const [worongPassword, setworongPassword] = useState(0)
    const [password, setpassword] = useState('')
    const [typePassword,setTypePassword] = useState('password')
    const ShowPassword = ()=> {
        if (typePassword == 'password') {
            setTypePassword('text')
        }
        else {
            setTypePassword('password')
        }
    }
    const { setUserExistOrNot, changeUserSnn,funSetToken,funAdmin } = useContext(SignInUserInfo)
    const sugnIn = (e) => {
        e.preventDefault()
        if (email === '')
            window.alert('يجب عليك ادخال الايميل')
        else if (password === '')
            window.alert('يحب عليك ادخال لرقم السري')
        else {
            try {
                const putLogIn = async () => {
                    const responsLogIndata = await fetch('http://localhost:4242/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' // Specify the content type as JSON
                        },
                        body: JSON.stringify({ // Stringify the body object
                            user_email: email,
                            user_password: password
                        })
                    });
                    const { status, token, u } = await responsLogIndata.json()
                    if (u === null) {
                         setBorderColor('red')
                         setpassword('')
                         setemail('')
                    }
                        const userStorageData = JSON.stringify({
                        tokens_storage: token,
                      user_ssn_storage: u.user_ssn,
                        AdminOrUser:u.is_admin,   
                        })
                    // to store in local storage
                    if (status === true) {
                        setBorderColor(null)
                        localStorage.setItem('userGraduationProject', userStorageData);
                        setpassword('')
                        setemail('')
                        changeUserSnn(u.user_ssn)
                        funSetToken(token)
                        // go to home..
                        navigate('/home')
                        if (u.is_admin === 'admin') {
                            funAdmin(1)
                        }
                        else {
                            setUserExistOrNot(1)
                        }
                    }
                    else {
                        console.log('email or password in valid..')
                        setBorderColor('red')
                    }           
                };
                putLogIn();
            }
            catch (e) {
                console.log('error in sign in with api');
            }
        }    
    }
  return (
      <div className='body-color'>
          <Container >
              <Animation />
                 
               <Row className='justify-content-center '>
                    <Col sm='6' className='d-flex justify-content-center'>
                        <div className='d-flex flex-column'>
                            <h2>آهلا سجل الدخول</h2>
                          <p>ليس لديك حساب؟
                            <Link to={'/SignUp'}> <a href='#'>انشئ حساب جديد</a></Link> 
                          </p> 
                        </div>
                        
                    </Col>
              </Row>

              <Row className='justify-content-center'>
                  <Col sm='6' className='signinbox'>
                      {password !== '' ? < Eye /> : null}
                      <form className='formStyle'>
                          <label> الاميل</label>
                          <input style={{borderColor:`${borderColor}`}} type={'email'} value={email} placeholder='ادخل الاميل' onChange={(e) => {setemail(e.target.value) }} />
                          <div className='ShowPassword'>
                              <label> الرقم السري</label>
                              <h6 className='ps-5' onClick={ShowPassword} >{typePassword =='password'?'اظهار':'اخفاء'}</h6>
                          </div>
                          <input style={{borderColor:`${borderColor}`}} type={typePassword} placeholder='ادخل الباسورد' value={password} onChange={(e) => { setpassword(e.target.value) }}>
                          </input>
                          <Link className='ps-5' to={'/ResetPassword'}>نسيت كلمه المرور؟</Link>
                          <button on onClick={sugnIn}>تسجيل الدخول</button>
                      </form>
                  </Col>
                      
             </Row>
          </Container>
         
      </div>
  )
}
