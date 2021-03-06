import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.style.scss'
import CartItem from '../cart-item/cart-item'
import {connect} from 'react-redux'
import {selectCartItems} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router-dom'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
const CartDropDown = ({cartItems, history, dispatch}) =>(
    <div className='cart-dropdown'>
        <div className='cart-items'> 

        {
            cartItems.length ? 
            cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} /> 
        ):
        <span className='empty-message'>Your shopping basket is empty</span>
        
        }
        </div>
            <CustomButton onClick={()=> {history.push('/checkout'); dispatch(toggleCartHidden())}}>GO TO CHECKOUT</CustomButton>
           
        
    </div>
);

const MapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(MapStateToProps)(CartDropDown));