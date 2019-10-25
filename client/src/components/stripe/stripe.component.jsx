import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishKey = "pk_test_NVUlkADzo4fnJsq425ezLm7x00tL4D7JBI";

    const onToken = (token)=>{
        console.log(token);
        alert('Paymemt Successful');
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