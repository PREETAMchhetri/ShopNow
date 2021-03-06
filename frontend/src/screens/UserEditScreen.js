import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (!userInfo) { history.push('/login') }
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, history, userId, successUpdate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />}

                {errorUpdate && <span>{errorUpdate}</span>}

                {loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> : error ? <span>{error}</span> : (

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
                                value={email}
                                placeholder='enter email'
                                onChange={(e) => setEmail(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}


            </FormContainer >
        </>

    )
}

export default UserEditScreen
