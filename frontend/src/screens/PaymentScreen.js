import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import { Button, Form, Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>

                <Col>
                    <Form.Check type='radio' label='Paytm' id='Paytm' name='paymentMethod' value='Paytm' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='Paypal' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>

                </Col>
            </Form.Group>

            <Button type='submit' variant='primary' disabled={!paymentMethod}>Continue</Button>
        </Form>
    </FormContainer>
}

export default PaymentScreen
