

export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateGST = (subtotal) => {
    return subtotal * 0.12;
};

export const calculateTotal = (subtotal, gst, deliveryCharge = 30) => {
    return subtotal + gst + deliveryCharge;
};