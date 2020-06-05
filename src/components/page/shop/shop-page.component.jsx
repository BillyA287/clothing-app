import React from 'react'
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
const CollectionPageWithSpinner = WithSpinner(CollectionsPage)

class ShopPage extends React.Component {
  componentDidMount(){
  const {fetchCollectionsStart} = this.props;
  fetchCollectionsStart()
  }

render (){
  const { match, isCollectionsLoaded } = this.props;
 
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
}
  

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded,
});


const mapDispatchToProps = (dispatch) => ({
fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)


