import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/messageAlert'
import Loader from '../components/loader'
import {getUserDetails} from '../store/actions/auth'

const ProfileScreen = ({location,history}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  
//Getting the details from reducer
  const userDetails = useSelector((state) => state.userDetailsReducer)
  const { loading, error, user } = userDetails
  
  //Getting the user login  details from reducer
  const userLogin = useSelector((state) => state.userLoginReducer)
  const { userInfo } = userLogin

 //Redirecting if user if already logged in
  useEffect(() => {
	  if(!userInfo){
		  history.push('/login')
	  }else{
		  //if no changes dispatching the action 
		  if(!user.name){
			  dispatch(getUserDetails('profile'))
		  }else{
			  setName(user.name)
			  setEmail(user.email)
		  }
	  }
  }, [dispatch, history ,userInfo, user])	
	
  const submitHandler = (e) => {
    e.preventDefault()
	  if(password !== confirmPassword){
		setMessage('Password doesnot match')
	  } else{
		  //Dispacth
	  }    
  }
	
	return(
		<Row>
			<Col md={3} >
				<h2> User Profile </h2>
			{message && <Message variant='danger'>{message}</Message> } 
			{error && <Message variant='danger'>{error}</Message> } 
			{loading && <Loader/> }
			<Form onSubmit={submitHandler} >
				<Form.Group controlId='name'>
					<Form.Label>Name Address</Form.Label>
					<Form.Control 
						type='name' 
						placeholder='name'
						value={name}
						onChange={(e) => setName(e.target.value) }></Form.Control>
				</Form.Group>
				
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control 
						type='email' 
						placeholder='email'
						value={email}
						onChange={(e) => setEmail(e.target.value) }></Form.Control>
				</Form.Group>
				
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control 
						type='password' 
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value) }></Form.Control>
				</Form.Group>
				
				<Form.Group controlId='confirmPassword'>
					<Form.Label> Confirm Password</Form.Label>
					<Form.Control 
						type='password' 
						placeholder='confirmPassword'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value) }></Form.Control>
				</Form.Group>
				
				<Button type='submit' variant='primary'> Update </Button>
			</Form>
			</Col>
			
			<Col md={9}>
				<h3>My order details </h3>
			</Col>
			
			
		</Row>
	)
}

export default ProfileScreen;