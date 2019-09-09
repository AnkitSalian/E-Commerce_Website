import React from 'react';
import {connect}  from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollections} from '../../redux/shop/shop.selector';
 
import './collections-overview.styles.scss';

const CollectionOverview = ({collections})=>{
    return (
        <div className="collection-overview">
            {collections.map(({id, ...otherprops})=>(
                    <CollectionPreview key={id} {...otherprops} />
                ))
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionOverview);