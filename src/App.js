import React from 'react';
import './App.css';
import HomePage from './components/page/homepage/homepage.component'
import './components/page/homepage/homepage.style.scss'
import {Switch, Route, Redirect} from 'react-router-dom'
import ShopPage from './components/page/shop/shop-page.component'
import Header from './components/header/header-component'
import SignInAndSignUpPage from './components/page/signin-in-and-sign-out/signin-in-and-sign-out.component'
import CheckoutPage from './components/checkout/checkout.component'
import {connect} from 'react-redux'
import { checkUserSession } from "./redux/user/user.actions";
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    
const {checkUserSession} = this.props

checkUserSession()
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});


const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(
  mapStateToProps, mapDispatchToProps
  
)(App);
