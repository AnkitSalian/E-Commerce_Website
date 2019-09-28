import React from 'react';

import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const withSpninner = WrappedComponent => ({isLoading, ...otherProps}) =>{
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) :
    <WrappedComponent {...otherProps} />
}

export default withSpninner;