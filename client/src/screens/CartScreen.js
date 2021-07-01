import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/messageAlert'
import {addToCart, removeFromCart} from '../store/actions/cart'

const CartScreen = ({match, location, history}) => {
	const productId = match.params.id
	//getting the qty params from the linnk
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	
	const dispatch = useDispatch()
	
	const cart = useSelector(state => state.cartReducer)
	const {cartItems} = cart 
	
	useEffect(()=>{
		if(productId) {
			dispatch(addToCart(productId, qty))
		}
	},[dispatch, productId, qty])
	
	const removeHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	
	const checkoutHandler = () => {
		history.push('/login?redirect')
		console.log('checkout')
	}
	
	return(
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>	
				{cartItems.length === 0 ? (
					<Message>Your Cart is Empty <Link to='/'> GO BACK..! </Link></Message>
					) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={3}>
										<Image src={item.image} alt={item.name} fluid rounded/>
									</Col>
									<Col md={3}>
										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2} > {item.price} </Col>
									<Col md={2}>
									{/* Geting the number of items in the form  */}
									{/* Dispatcing addToCart when we chnage cart qty on cart page */}
										<Form.Control as='select' value={item.qty} 
											
											onChange={e => dispatch(addToCart(item.product, Number(e.target.value))) }>
											
											{/* Converting countInStock to array to display in the form   */}
											
											{
												[...Array(item.countInStock).keys()].map(x => (
												<option key={x + 1 } value= {x + 1} > {x + 1} </option>	
												))
											}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button type='button' variant='light' onClick={() => removeHandler(item.product)} >
										<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush' >
						<ListGroup.Item>
							<h2>Sub Total ({cartItems.reduce((acc, item) => acc + item.qty, 0 )}) items</h2>
							${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
						</ListGroup.Item>
					</ListGroup>
					<ListGroup>
						<Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
							Proceed to checkout
						</Button>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen;