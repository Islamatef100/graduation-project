import './StylePaied.css'
import { Col, Container, Row,Button } from 'react-bootstrap'
import { useContext, React, useState,useEffect } from 'react'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function Payment_History({ notify }) {
  const [DataTransactions, set_DataTransactions] = useState(null)
  const [is_loading, set_loading] = useState(0)
  const { user_ssn, token } = useContext(SignInUserInfo)
  useEffect(() => {
    try {
      const getAllTransactions = async () => {
        const transactionResponse = await fetch(`http://localhost:4242/transactions/${user_ssn}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const Data = await transactionResponse.json()
        console.log('the transaction response is: ', Data)
        await set_DataTransactions(Data)
        set_loading(1)
      }
      getAllTransactions()
    }
    catch (e) {
      console.log('can not get user transactions..')
    }
  }, [])
//   const check = () => {
//   const hasPaidTransaction = DataTransactions.transactions.some(
//     (item) => item.payment_status !== 'paid'
//   );

//   if (hasPaidTransaction) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

    return (
      <div className='font color-body'>
        <Container >
          <Row className='justify-content-center mt-5'>
            <Col className='py-3 mt-5 text-center' sm='2'>
              {/* <p style={{borderBottom:'2px solid teal', paddingBottom:'1rem'}}>لديك { is_loading ===1?DataTransactions.transactions.length:<p>..جاري التحميل</p>} فواتير</p> */}
            </Col>
          </Row>
          <Row className='justify-content-center' >
            <Col sm='11' >
              <div className='rectangle'>
                <table className='table-style'>
                  <thead>
                    <td></td>
                    <td>مكان الكارته</td>
                    <td>رقم العربيه</td>
                    <td>التاريح</td>
                    <td>قيمه الفاتوره</td>
                  </thead>
                 <tbody>
                      {is_loading === 1 ? (
                        // {/* <h1 className="transaction_notFound"> لم تقم بدفع اي فواتير حتي الان </h1> */}
                        DataTransactions.transactions.map((element, index) => {
                          if (element.payment_status !== 'notpaid' || element.is_reported === 'approved') {
                           return (
                              <tr key={index} className='py-5'>
                                <td className='PayedSector'>{index}</td>
                                <td>{element.place}</td>
                                <td>{element.vehicle}</td>
                                <td>{element.adjustment_date}</td>
                                <td>{element.fine}</td>
                              </tr>
                            );
                         
                          } else {
                           return null
                          }
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="transaction_notFound">لم تقم بدفع أي فواتير حتى الآن</td>
                        </tr>
                      )}
</tbody>

                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }