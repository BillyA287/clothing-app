import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 145
    const publishableKey = 'pk_test_WLxkBgQw50T0KgoPLnQmbxy5006bXWMTPQ'


    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }
    return (
      <StripeCheckout
        label="Pay Now"
        name="clothing-app"
        billingAddress
        shippingAddress
        image="https://sendeyo.com/up/d/f3eb2117da"
        description={`Your total is $${price}`} amount = {priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
      />
    );
}

export default StripeCheckoutButton;
