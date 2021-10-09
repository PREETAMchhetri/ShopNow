import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from 'react-loader-spinner'
const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    //To check if user is already loginn
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    //LISTING MY ORDERS
    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')

        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())

            } else {
                setName(user.name)
                setEmail(user.email)
            }

        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password does not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>{message}</span>}
            {error && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>{error}</span>}
            {success && <span className='m-3' style={{ backgroundColor: 'rgb(245, 151, 151) ', fontWeight: 'bold', color: 'maroon' }}>Profile Updated</span>}
            {loading && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter email'
                        value={email}
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
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h4>My Orders</h4>
            {loadingOrders ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : errorOrders ? <span>{errorOrders}</span> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 &&
                            <tr>
                                <td>
                                    <span>No Orderd Items</span>
                                </td>
                            </tr>
                        }
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            )}
        </Col>

    </Row >
}

export default ProfileScreen
