import React from 'react';
import {connect}  from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollectionForPreview} from '../../redux/shop/shop.selector';
 
//import './collections-overview.styles.scss';
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionOverview = ({collections})=>{
    return (
        <CollectionsOverviewContainer>
            {collections.map(({id, ...otherprops})=>(
                    <CollectionPreview key={id} {...otherprops} />
                ))
            }
        </CollectionsOverviewContainer>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);