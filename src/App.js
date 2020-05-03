import React from 'react';
import './App.css';
import HomePage from './components/page/homepage/homepage.component'
import './components/page/homepage/homepage.style.scss'
import {Switch, Route} from 'react-router-dom'
import ShopPage from './components/page/shop/shop-page.component'


function App() {
  return (
    <div>
    <Switch>
     <Route exact path='/' component={HomePage}/>
     <Route path ='/shop' component={ShopPage} />
     </Switch>
    </div>
  );
}

export default App;
