import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

import {updateCollection} from '../../redux/shop/shop.action';

class ShopPage extends React.Component{
        unsubscribeFromSnapShot = null;
        componentDidMount(){
            const {updateCollection} = this.props;
            const collectionRef = firestore.collection('collections');
            collectionRef.onSnapshot(async snapshot => {
               const collectionMap = convertCollectionSnapshotToMap(snapshot);
               updateCollection(collectionMap);
               
            })
        }
        render(){
            const {match} = this.props;
            return(
                <div className="shop-page">
                    <Route exact path={`${match.path}`} component={CollectionOverview}  />
                    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
                </div>
            );
        }
}

const mapDispatchToProps = dispatch => ({
    updateCollection: collectionsMap => dispatch(updateCollection(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);