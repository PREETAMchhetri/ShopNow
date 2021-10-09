import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { Button, Form, Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password does not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>{message}</span>}
            {error && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>{error}</span>}
            {loading && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
                        Log In
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
