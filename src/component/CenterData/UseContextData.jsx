import React from 'react'
// create context.
import { createContext,useState } from 'react'
export const SignInUserInfo = createContext()

export function UseContextData({ children }) {
    // here i will replace value in object have user exist or now and data which need it to get user data.
    const [user, setUser] = useState(0)
    const [user_ssn,setUserSnn] = useState('') 
    const [token, setToken] = useState('')
    const [admin , setAdmin] = useState(0)
    function setUserExistOrNot(exist) {
        setUser(exist)
    }
  function changeUserSnn(ssn) {
        setUserSnn(ssn)
  }
  function funSetToken(data) {
        setToken(data)
  }
  function funAdmin(data) {
    setAdmin(data)
  }
  return (
      <SignInUserInfo.Provider value={{user,setUserExistOrNot,user_ssn,changeUserSnn,token,funSetToken,admin,funAdmin}}>
      {children}
    </SignInUserInfo.Provider>
  )
}

