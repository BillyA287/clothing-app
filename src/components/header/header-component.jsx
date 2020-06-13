import React from 'react'
import './header-style.scss'
import {ReactComponent as Logo} from '../../assets/original (1).svg' 
import {connect} from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import  CartDropDown  from "../cart-dropdown/cart-dropdown.component";
import {createStructuredSelector} from 'reselect'

import {SelectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

import {signOutStart} from '../../redux/user/user.actions'

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: SelectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: ()=> dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
