import React from 'react';
import {Switch ,Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import {HomePage} from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {selectCurrentUser} from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {

  unSubscribeFromAuth = null;

  componentDidMount(){
    // const {setCurrentUser} =this.props;
    // this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);
        
    //     userRef.onSnapshot(snapshot=>{
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       }
    //       )
    //     })
    //   }
    //   setCurrentUser(userAuth);
    //   //addCollectionAndDocument('collections', collectionArray.map(({title, items}) => ({title, items})));
    // })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render ={()=>(
            this.props.currentUser ? (
              <Redirect to="/" />
            ) :(
              <SignInSignUp />
            )
          )} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(App);
