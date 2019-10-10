import React from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import {googleSignInStart} from '../../redux/user/user.action';

import './signin.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        }catch(error){
            console.log('error===>',error);
            
        }
        
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render(){
        const {googleSignInStart} = this.props;
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" label="Email"  handleChange={this.handleChange} value={this.state.email} required />
                    <FormInput name="password" type="password" label="Password" handleChange={this.handleChange} value={this.state.password} required />
                    
                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>{' '}Sign in with Google{' '}</CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn);