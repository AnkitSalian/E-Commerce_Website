import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishKey = "pk_test_NVUlkADzo4fnJsq425ezLm7x00tL4D7JBI";

    const onToken = (token)=>{
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch(error => {
            console.log('Payment error: ',JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you are using the provided credit card')
        })
    }

    return (
        <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image="https://sendeyo.com/up/d/f3eb2117da"
        description={`Your total price is ₹${price}`}
        amount={priceForStripe}
        token={onToken}
        stripeKey={publishKey} />
    );
}

export default StripeCheckoutButton;