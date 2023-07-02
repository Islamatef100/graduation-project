import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
export default function AccordionSection() {
    return (
        <Container className='accordionStyle'>
            <Row className='d-flex justify-content-center'>
                <Col sm='10' lg='10' className='text-center'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <p className='mx-auto fon'> ما هو fastRoad</p>
                            
                            </Accordion.Header>
                            <Accordion.Body>
                           هو نظام الي لدفع رسوم الكارته من خلال هذا الموقع او ايضا من خلال  application دون الحاجه الي الوقوف في الكارته وانتطار الطابور لدفع الرسوم ويمكن ايضا الابلاغ عن السياره اذا سرقت وهذه ليست بديل للاجرائات القانونيه ولكن لكي يبدا السيستم بتتبع السياره عند التعرف عليها لكسب الوقت قبل اجراء الخطوات القانونيه
                            </Accordion.Body>
                        </Accordion.Item>
                                <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <p className='mx-auto fon' >  خَطَأ في الرسوم </p>
                            </Accordion.Header>
                            <Accordion.Body>
                               هذا نادرا ما يحدث ولكنه ايضا يمكن حدوث هذا وعندها عليك بتقديم الشكوي وسوف يقوم المسؤل بمراجعه صوره الكاميرا مع بينات سيارتك واذا وجد انك محق سوف يتم الغاء الرسوم وايضا العرامه ان وجدت
                                </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <p className='mx-auto fon' >ما هذه الغرامه؟</p>
                            </Accordion.Header>
                            <Accordion.Body>
                               الغرمه هي قيمه اضافيه علي رسوم المرور في حال اذا تآخرت عن دفع الرسوم في الوقت الذي تحدده اداره المرور
                                </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                <p className='mx-auto fon' > ماذا افعل اذا سرقت سيارتي؟ </p>
                            </Accordion.Header>
                            <Accordion.Body>
                               قم يتفعيل خيار سرقه السياره علي website او ال application وفي هذه اللحظه سوف يبدآ السيستم بتعقب سيارتك وبعدها قم باجرء الاجرائات القانونيه فورا
                            </Accordion.Body>
                            <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                <p className='mx-auto fon' >من يمكنه انشاء حساب علي هذا الموقع</p>
                            </Accordion.Header>
                            <Accordion.Body>
                             اي شخص لديه سياره او اكثر هو من يستخدم هذا السستم ويكون مسجل علي حسابه جميع سياراته التي يملكها واذا ترك سياره او اشتري سياره يجب عليه ان يحدث بيناته علي او سوف يقوم المسؤل في الشهر العقاري او اداره المرور بتحديث بيناته
                                </Accordion.Body>
                        </Accordion.Item>
                        </Accordion.Item>
                        
                    </Accordion>
                </Col>
            </Row>
            
         </Container>
  );
}
