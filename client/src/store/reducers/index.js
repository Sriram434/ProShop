import {combineReducers} from 'redux';
import {productListReducer,productDetailReducer } from './products'
import {cartReducer} from './cart'
import {userLoginReducer, userRegisterReducer} from './currentUser'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
	cart: {cartItems: cartItemsFromStorage },
	user: {userInfo: userInfoFromStorage }
}

const rootReducer = combineReducers({
	productListReducer,
	productDetailReducer,
	cartReducer,
	userLoginReducer,
	userRegisterReducer,
	initialState
})

export default rootReducer;