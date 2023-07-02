import React, { useEffect, useState,useContext } from 'react'
import CardReport from './CardReport'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function AnswerReport(searchWord) {
  const { token } = useContext(SignInUserInfo)
  const [alTransaction, setTrasaction] = useState(null)
  const [loading, setLoad] = useState(0)
  const [callRender,setCallRender] = useState(0)
  useEffect(() => {
    try {
      const GerAlllTransaction =async () => {
        const response = await fetch('http://localhost:4242/transactions', {
          method: 'GET',
          headers: {
             'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setTrasaction(data.transactions)
        setLoad(1)
       // console.log('the Total transaction response is:',data)
      }
      GerAlllTransaction()
    }
    catch (e) {
      console.log('in anser at report cant get all transaction..')
    }
  },[callRender])
  return (
   <div className='AllAnserReport'>
  {loading === 1 ? alTransaction.map((item, index) => {
    if (item.is_reported === 'waiting') {
      if(searchWord.searchWord === ''|| item.vehicle.includes(searchWord.searchWord)||item.adjustment_time.includes(searchWord.searchWord)||item.adjustment_date.includes(searchWord.searchWord)||item.place.includes(searchWord.searchWord))
        return <CardReport
          transactionID={item.transaction_id}
          time={item.adjustment_time}
          date={item.adjustment_date}
          address={item.place}
          carId={item.vehicle}
          key={index} number={index}
          render={setCallRender}
        />;
      else
        return null

    }
    return null; 
  }) : <p>is loading...</p>}
</div>

  )
}
