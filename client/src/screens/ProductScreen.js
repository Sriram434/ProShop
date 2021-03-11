import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import {connect} from 'react-redux'
import {listProductDetails} from '../store/actions/products'

class ProductScreen extends Component{

	componentDidMount(){
		this.props.listProductDetails(this.props.match.params.id)
	}

	render(){
		console.log('product',this.state.product)
	return(
		<div>
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			<Row>
				<Col md={6}>
					<Image src={this.state.product.image} alt={this.state.product.name} fluid />
				</Col>
					
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>{this.state.product.name}</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating value={this.state.product.rating} text={`${this.state.product.numReviews} reviews`}/>
						</ListGroup.Item>
						<ListGroup.Item>
							Price: ${this.state.product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							Description: {this.state.product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col> Price : </Col>
									<Col> <strong> {this.state.product.price} </strong></Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{this.state.product.countInStock > 0 ? 'In Stock' : 'Out Of Order'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button className='btn-block' type='button' disabled={this.state.product.countInStock === 0}>Add To Cart</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
}
	
function mapStateToProps(state) {
	return {
		product: state.productDetailReducer
	}
}

export default connect(mapStateToProps,{listProductDetails})(ProductScreen);