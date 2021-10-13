import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteOrder } from '../actions/orderActions'
import Loader from 'react-loader-spinner'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const orderDelete = useSelector(state => state.orderDelete)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteOrderHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteOrder(id))
        }
    }
    return (
        <>
            <h1>Orders</h1>
            {loadingDelete && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}
            {errorDelete && <span>{errorDelete}</span>}
            {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : error ? <span>{error}</span> : (
                <Table striped variant='light' responsive bordered hover className='table-sm'  >
                    <thead>
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>USER</th>
                            <th>ORDER DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>



                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>

                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: "red" }}></i>
                                }</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: "red" }}></i>
                                }</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='success' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteOrderHandler(order._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
