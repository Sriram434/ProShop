import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {connect} from 'react-redux'
import {listProductDetails} from '../store/actions/products'
import Loader from '../components/loader'
import Message from '../components/messageAlert'

class ProductScreen extends Component{
	state = {
		qty: 1
	}
	componentDidMount(){
		this.props.listProductDetails(this.props.match.params.id)
	}	

	render(){
		const {product, loading, error} = this.props
	
	const addToCartHandler = (e) => {
		this.props.history.push(`/cart/${this.props.match.params.id}?qty=${this.state.qty}`)
	}
	return(
		<div>	
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			{loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message> : (
				<Row>
				<Col md={6}>	
					<Image src={product.product.image} alt={product.product.name} fluid />
				</Col>
					
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>{product.product.name}</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating 
								value={product.product.rating} 
								text={`${product.product.numReviews} reviews`} />
						</ListGroup.Item>
						<ListGroup.Item>
							Price: ${product.product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col> Price : </Col>
									<Col> <strong> {product.product.price} </strong></Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.product.countInStock > 0 ? 'In Stock' : 'Out Of Order'}
									</Col>
								</Row>
							</ListGroup.Item>
							
							{product.product.countInStock > 0 && (
							<ListGroup.Item>
								<Row>
									<Col> Qty: </Col>	
									<Col>
										{/* Geting the number of items in the form  */}
										<Form.Control as='select' value={this.state.qty} 
											onChange={e => this.setState({qty:e.target.value}) }>
											{/* Converting countInStock to array to display in the form   */}
											
											{
												[...Array(product.product.countInStock).keys()].map(x => (
												<option key={x + 1 } value= {x + 1} > {x + 1} </option>	
												))
											}
										</Form.Control>
									</Col>
								</Row>
								</ListGroup.Item>
							)}
							
							<ListGroup.Item>
								<Button 
									onClick={addToCartHandler}
									className='btn-block' 
									type='button' 
									disabled={product.product.countInStock === 0}>Add To Cart</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			)}
			
		</div>
	)
}
}
	
const mapStateToProps = (state) => {
	return {
		product: state.productDetailReducer
	}
}

export default connect(mapStateToProps,{listProductDetails})(ProductScreen);