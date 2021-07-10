import rootReducer from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import  thunk from 'redux-thunk';
import {login} from './actions/auth'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

const setTokenHeader = token => {
	if(token){
		console.log(token)
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axios.defaults.headers.common['Authorization']
	}
}

if(localStorage.userInfo) {
		setTokenHeader(localStorage.userInfo)
		try {
			store.dispatch(login(jwtDecode(localStorage.userInfo)))
		}catch(e){
			console.log(e.message)
		}
		
}

export function configureStore(){
	return store;
}


