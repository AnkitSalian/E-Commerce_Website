import React, {useEffect, lazy, Suspense} from 'react';
import {Switch ,Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {GlobalStyle} from './global.styles';

import Spinner from './components/spinner/spinner.component'

//import {HomePage} from './pages/homepage/homepage.components';
//import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
//import SignInSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {selectCurrentUser} from './redux/user/user.selector';
import {checkUserSession} from './redux/user/user.action';
import CheckoutPage from './pages/checkout/checkout.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.components'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInSignUp = lazy(() => import('./components/sign-in-and-sign-up/sign-in-and-sign-up.component'));

const App = ({checkUserSession, currentUser}) => {

  
  useEffect(() => {
    checkUserSession();
  },[checkUserSession])
  
    return (
      <div className="App">
        <GlobalStyle />
        <Header />
        <Switch>
          <Suspense fallback={<Spinner />} >
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render ={()=>(
              currentUser ? (
                <Redirect to="/" />
              ) :(
                <SignInSignUp />
              )
            )} />
          </Suspense>
        </Switch>
      </div>
    );
  
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
