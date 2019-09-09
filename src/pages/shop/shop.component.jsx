import React from 'react';

import CollectioOverview from '../../components/collection-overview/collection-overview.component';

const ShopPage = ({collections})=>{
    
        return(
            <div className="shop-page">
                <CollectioOverview />
            </div>
        );
}

export default ShopPage;