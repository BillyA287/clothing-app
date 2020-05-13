import React from 'react'
import {Route } from 'react-router-dom'
import CollectionsOveriew from '../../collections-overview/collections-overview.component'
import {createStructuredSelector} from 'reselect'
import CollectionsPage from '../collection/collection.component'

const ShopPage = ({ match}) => (
  <div className="shop-page">
    <Route exact path ={`${match.path}`} component ={CollectionsOveriew} />
    <Route path={`${match.path}/:collectionId`} component={CollectionsPage}/>
  </div>
);
  




export default ShopPage


