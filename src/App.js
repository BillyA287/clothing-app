import React from 'react';
import './App.css';
import HomePage from './components/page/homepage/homepage.component'
import './components/page/homepage/homepage.style.scss'
import {Switch, Route} from 'react-router-dom'
import ShopPage from './components/page/shop/shop-page.component'
import Header from './components/header/header-component'
import SignInAndSignUpPage from './components/page/signin-in-and-sign-out/signin-in-and-sign-out.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
class App extends React.Component {
 
  constructor(){
    super();

    this.state={
      currentUser: null

    };
  }

  unsubscribeFromAuth = null;


    componentDidMount(){
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);


            userRef.onSnapshot(snapshot => {
              console.log(snapshot.data())
              this.setState({
                currentUser: {
                  id: snapshot.id,
                  ...snapshot.data()
                }
              });
              console.log(this.state)
            })
        }
      this.setState({ currentUser: userAuth});
      
      })

    }

      componentWillUnmount () {
        this.unsubscribeFromAuth();
      }
    
  


  render(){
  return (
    <div>
      <Header currentUser = {this.state.currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}
}

export default App;
