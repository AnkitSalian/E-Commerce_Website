import React, {useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.action';

import './signin.styles.scss';

const SignIn = ({emailSignInStart, googleSignInStart})=>{
    const [userCredentials, setCredentials] = useState({email: '', password:''});
    const {email, password} = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        
        //const {emailSignInStart} = this.props;
        
        await emailSignInStart(email, password);
        
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setCredentials({...userCredentials, [name]:value});
    }

        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" label="Email"  handleChange={handleChange} value={email} required />
                    <FormInput name="password" type="password" label="Password" handleChange={handleChange} value={password} required />
                    
                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>{' '}Sign in with Google{' '}</CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);