import React from 'react'
import { Card } from 'react-bootstrap'
export default function Car({ vicleClass, vicleId,vicleColor,model}) {
    return (
        <>
                <Card
                bg={ 'white'}
                text={ 'black'}
                // style={{width:'400px'}}
                className="mb-2 card-style m-5">
                <Card.Header style={{ backgroundColor: 'teal', color: 'white', fontSize: '1.5rem' }}>{vicleClass}</Card.Header>
                    <Card.Body>
                    <Card.Title>{'النوع:'} {model} </Card.Title>
                    <Card.Text>
                            <h5>رقم الوحه: {vicleId}</h5>
                            <h5>الون: {vicleColor}</h5>
                        </Card.Text>
                    </Card.Body>
            </Card>
    </>
  )
}
