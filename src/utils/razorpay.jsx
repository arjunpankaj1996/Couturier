export const loadRazorpay = (userData, cartItem, amount) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => openRazorpay();
      script.onerror = () => {
        alert('Razorpay SDK failed to load. Are you online?');
        reject('Razorpay SDK failed to load');
      };
      document.body.appendChild(script);
    } else {
      openRazorpay();
    }
    function openRazorpay() {
      const options = {
        key: "rzp_test_E0WOSgnSd7sokK",
        amount: amount * 100,
        currency: "INR",
        name: "Couturier",
        description: " Order Payment",
        image: "https://your-logo-url.com/logo.png",
        handler: function (response) {
          resolve(response.razorpay_payment_id);
          alert("Payment Successful!");
          console.log(response);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  });
};