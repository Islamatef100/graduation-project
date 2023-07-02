import './Style.css'
import { Col, Container, Row,Button } from 'react-bootstrap'
// import { payment } from './tryStaticData' 
import MoreDeatails from './MoreDeatails'
import { useContext, React, useState,useEffect } from 'react'
import { SignInUserInfo } from '../../CenterData/UseContextData'
export default function SelectFees({ notify }) {
  const [DataTransactions, set_DataTransactions] = useState(null)
  const [is_loading,set_loading] = useState(0)
  const { user_ssn, token } = useContext(SignInUserInfo)
  const [img_path, setImg_path] = useState('')
  const [trans_ID, set_Transaction_Id] = useState(null)
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
  },[])
  // const [data, setData] = useState(payment)
  const [ShowImage, SetShowImage] = useState(false)
  // let selectedData = []
  const [AllFee, setAllFee] = useState(0)
  const calckAllMoney = (fee,fine) => {
    setAllFee(fee+fine)
  }
  const doPayment = (transactinID) => {
    try {
      const GetLink = async()=> {
        const GetLinkRespons = await fetch(`http://localhost:4242/transactions/${user_ssn}/checkout-session/${transactinID}`, {
          method: 'GET',
          headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           }
        })
        console.log('response from gt link payment is: ', GetLinkRespons)
        const Link = (await GetLinkRespons.json())
        if (Link.status === 'success') {
            const newTab = window.open(Link.url, '_blank');
            newTab.focus();
        }
        
      }
      GetLink()
    }
    catch (e) {
      console.log('can not get payment link from API')
    }
  }








  const Seeimage = async (img_name, id) => {  

    console.log('img name is: ', img_name)
    await setImg_path(`/Users/mac/final/uploads/transactions/${img_name}`)
    await set_Transaction_Id(id)
    //console.log('all path of image is:', img_path)
    SetShowImage(true)
  }




return (
    <div className='font color-body'>
    {(ShowImage && img_path !== '') ? < MoreDeatails
      ShowOrNot={SetShowImage}
      theImage={img_path}
      UserSSN={user_ssn}
      TransID={trans_ID}
      notify={notify}
      theToken={token} /> : null}
        <Container >
          <Row className='justify-content-center mt-5'>
            <Col className='py-3 mt-5 text-center' sm='2'>
            <p style={{borderBottom:'2px solid teal', paddingBottom:'1rem'}}>لديك { is_loading ===1?DataTransactions.transactions.length:<p>..جاري التحميل</p>} فواتير</p>
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
                  {/* <td>الغرامه</td> */}
                  <td>التآكيد</td>
                  <td>دفع</td>
                </thead>
                <tbody>
                  {is_loading === 1 ? (
                    DataTransactions.transactions.length === 0 ? (
                      <h1 className="transaction_notFound">ليس لديك اي فواتير لدفعها</h1>
                    ) : (
                      DataTransactions.transactions.map((element, index) => {
                        if (element.payment_status !== 'notpaid') {
                          return null;
                        }
                        else if (element.is_reported === 'approved') {
                          return null
                        }
                        else {
                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{element.place}</td>
                              <td>{element.vehicle}</td>
                              <td>{element.adjustment_date}</td>
                              <td>{element.fine}</td>
                              {/* <td>الغزامه</td> */}
                              <td>
                                <Button
                                  style={{ backgroundColor: '#034646' }} className="btn-style btn-deploy py-3" onClick={() => Seeimage(element.vehicle_image, element.transaction_id)} >
                                  تفاصيل اكثر
                                </Button>
                              </td>
                              <td>
                                <Button
                                  style={{ backgroundColor: '#034646' }} className="btn-style btn-deploy py-3" onClick={() => doPayment(element.transaction_id)}  >
                                  دفع الفاتوره
                                </Button>
                              </td>
                            </tr>
                          )};
                        })
  )
) : null}
                </tbody>
              </table>
              </div>
            </Col>
        </Row>
      </Container>
      </div>
  )
}