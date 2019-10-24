import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {signOutStart} from '../../redux/user/user.action';

import {HeaderContainer, LogoContainer, OptionContainer, OptionLink} from './header.styles';

const Header = ({currentUser, hidden, signOutStart})=>{
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/contact">
                    CONTACTS
                </OptionLink>
                {
                    currentUser ?
                    <OptionLink as='div' onClick={signOutStart} >SIGN OUT</OptionLink>
                    :
                    <OptionLink to="/signin" >SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionContainer>
            { hidden ? null : <CartDropDown /> }
        </HeaderContainer>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
    
const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);