import {combineReducers} from 'redux';
import {productListReducer,productDetailReducer } from './products'

const rootReducer = combineReducers({
	productListReducer,
	productDetailReducer
})

export default rootReducer;