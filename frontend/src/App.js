import React from 'react';
import logo from './logo.svg';
import './App.css';

function loadScript(src) {
  return new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
  script.onload = () => {
    resolve(true)
  }
  script.onerror = () => {
    resolve(false)
  }

  })
  
  
}

const __DEV__ = document.domain === 'localhost'

function App() {

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if(!res) {
      alert('Razor SDK failed to load.')
    }

    const data = await fetch('http://localhost:1337/razorpay', {method : 'POST'}).then((t) =>
    t.json()
    )

    console.log(data)
    // "amount": "70000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    // "currency": "INR",
    const options = {
      key: "rzp_test_Hg664ZYjofFcwI", // Enter the Key ID generated from the Dashboard
      currency : data.currency,
      amount: data.amount.toString(),
      orderid:data.id,
      name: "Freemium Plan",
      description: "Test Transaction",
      image: "http://localhost:1337/logo.svg",
      handler: function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      prefill: {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
     
  };

  var paymentObj = new window.Razorpay(options);
  paymentObj.open()

  }
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe BillsPls
        </a>
      </header>
    </div>
  );
}

export default App;
