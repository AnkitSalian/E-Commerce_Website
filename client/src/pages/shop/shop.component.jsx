import React, {useEffect, lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

//import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
//import CollectionPageContainer from '../../pages/collection/collection.container';

import Spinner from '../../components/spinner/spinner.component';

import {fetchCollectionsStart} from '../../redux/shop/shop.action';

const CollectionOverviewContainer = lazy(() => import('../../components/collection-overview/collection-overview.container'));
const CollectionPageContainer = lazy(() => import('../../pages/collection/collection.container'));

const ShopPage = ({fetchCollectionsStart, match}) => {

        useEffect(()=>{
            fetchCollectionsStart();
        },[fetchCollectionsStart])
            return(
                <div className="shop-page">
                    <Suspense fallback={<Spinner />} >
                        <Route exact path={`${match.path}`} component={CollectionOverviewContainer}  />
                        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer } />
                    </Suspense>
                </div>
            );
        
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: ()=>dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);