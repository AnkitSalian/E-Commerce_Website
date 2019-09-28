import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

import {updateCollection} from '../../redux/shop/shop.action';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

    state = {
        loading : true
    };
        unsubscribeFromSnapShot = null;
        componentDidMount(){
            const {updateCollection} = this.props;
            const collectionRef = firestore.collection('collections');
            collectionRef.onSnapshot(async snapshot => {
               const collectionMap = convertCollectionSnapshotToMap(snapshot);
               updateCollection(collectionMap);
               this.setState({loading: false});
            })
        }
        render(){
            const {match} = this.props;
            const {loading} = this.state; 
            return(
                <div className="shop-page">
                    <Route exact path={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}  />
                    <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
                </div>
            );
        }
}

const mapDispatchToProps = dispatch => ({
    updateCollection: collectionsMap => dispatch(updateCollection(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);