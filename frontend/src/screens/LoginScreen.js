import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Button, Form, Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>Invalid Email id or password</span>}
            {loading && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter email'
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Submit
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default LoginScreen
