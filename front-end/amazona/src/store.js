import { createStore ,compose ,applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk'
import { cartReducers } from "./Reducers/cartReducers";
import {productListReducer,productDetailReducer} from './Reducers/productReducers'
import { userRegisterReducer, userSigninReducer } from "./Reducers/userReducers";

const initialState={
    userSignin:{
        userInfo:localStorage.getItem('userInfo')?
            JSON.parse(localStorage.getItem('userInfo')):
            null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')?
            JSON.parse(localStorage.getItem('cartItems')):
            [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod:'PayPal',        
    },
};
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailReducer,
    cart:cartReducers,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer
})

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose

const store=createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;