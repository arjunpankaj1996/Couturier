import React from 'react'
import { useCart } from '../hooks/useCart';
import { Navigate } from 'react-router-dom';

const ProtectCheckout = ({children}) => {
    const {cartItems , isLoading} = useCart();
    console.log(cartItems);
    
  return (
    cartItems.length > 0 ? (
        <div>{children}</div>
    ) : (
        !isLoading &&
        <Navigate to='/'/>
    )
  )
}

export default ProtectCheckout