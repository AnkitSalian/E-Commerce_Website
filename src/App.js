import React from 'react';
import {Switch ,Route} from 'react-router-dom';

import './App.css';

import {HomePage} from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super();
    this.state ={
      currentUser: null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          },()=>console.log('userAuth===>',this.state.currentUser)
          )
        })
      }
      this.setState({currentUser : userAuth});
      
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
