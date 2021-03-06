import React,{useEffect} from 'react'
import {Route } from 'react-router-dom'
import CollectionsOverviewContainer from "../../collections-overview/collections-overview.container";
import CollectionsPage from '../collection/collection.component'
import {connect} from 'react-redux';
import { fetchCollectionsStart } from "../../../redux/shop/shop.actions";
import WithSpinner from '../../with-spinner/with-spinner.component'
import {createStructuredSelector} from 'reselect'
import {
  selectIsCollectionsLoaded,
} from "../../../redux/shop/shop.selectors";
import './shop.styles'
const CollectionPageWithSpinner = WithSpinner(CollectionsPage)

const ShopPage = ({fetchCollectionsStart, match, isCollectionsLoaded}) => {
  useEffect(() =>{
    fetchCollectionsStart()
  }, [fetchCollectionsStart])


 
return (
  <div className="shop-page">
    <Route
      exact
      path={`${match.path}`}
        component = {CollectionsOverviewContainer}
        />
    <Route
      path={`${match.path}/:collectionId`}
      render={(props) => (
        <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
      )}
    />
  </div>
);
}

  

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded,
});


const mapDispatchToProps = (dispatch) => ({
fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)


