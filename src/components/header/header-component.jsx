import React from 'react'
import {Link} from 'react-router-dom'
import './header-style.scss'
import {auth} from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from '../../assets/original (1).svg' 
import {connect} from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect'

import {SelectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selector'

const Header = ({currentUser, hidden}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        currentUser ? 
        <div className="option" onClick={()=> auth.signOut()}> SIGN OUT</div>
        :
        <Link className="option" to='/signin'>
          SIGN IN
        </Link>
      }
      <CartIcon />
    </div>
    { hidden ? null :
    <CartDropDown />
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: SelectCartHidden
});

export default connect(mapStateToProps)(Header);