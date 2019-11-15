import React from 'react';

import Spinner from '../spinner/spinner.component';

const withSpninner = WrappedComponent => ({isLoading, ...otherProps}) =>{
    return isLoading ? (
        <Spinner />
    ) :
    <WrappedComponent {...otherProps} />
}

export default withSpninner;