import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,	PRODUCT_LIST_FAIL,
	   PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL
	   } from '../actionTypes'
import axios from 'axios'

//Fetch all the details (home screen)
export const listProducts = () => async (dispatch) => {
	try{
		//Will dispatch when start (initial load)
		dispatch({
			type: PRODUCT_DETAILS_REQUEST
		})
		
		const {data} = await axios.get('/api/products')
		//Sucess when data gets load from server
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			 payload: data	
		 })
		
	} catch(err){
		//dispatch when fetching from server fails
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			 payload: err.message
		 })
	}
}

export const listProductDetails = (id) => async (dispatch) => {
	try{
		//Will dispatch when start (initial load)
		dispatch({
			type: PRODUCT_LIST_REQUEST
		})
		
		const {data} = await axios.get(`/api/product/${id}`)
		//Sucess when data gets load from server
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			 payload: data	
		 })
		
	} catch(err){
		//dispatch when fetching from server fails
		dispatch({
			type: PRODUCT_LIST_FAIL,
			 payload: err.message
		 })
	}
}