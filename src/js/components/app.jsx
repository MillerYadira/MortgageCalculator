import React, { useState, useEffect } from 'react';
import Form from './Form';
import Output from './Output';
import AmortizationSchedule from './AmortizationSchedule';  // New component import

const App = () => {
  const initialData = { balance: '', rate: '', term: '15', payment: '', jennyPayment: '', pailPayment: '', schedule: [] };
  const [data, setData] = useState(initialData);
  const [isJenny, setIsJenny] = useState(false); 
  const [layoutChanged, setLayoutChanged] = useState(false); 
  const [isAltBackground, setIsAltBackground] = useState(false); 

  const handleInputChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const calculateAmortizationSchedule = (principal, monthlyRate, numPayments, monthlyPayment) => {
    let schedule = [];
    let remainingBalance = principal;

    for (let i = 1; i <= numPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        balance: Math.max(remainingBalance, 0).toFixed(2), // Ensure balance doesn't go negative
      });
    }

    return schedule;
  };

  const calculatePayment = () => {
    const { balance, rate, term } = data;
    const principal = parseFloat(balance);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const numPayments = parseInt(term) * 12;

    let payment = principal && monthlyRate && numPayments
      ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
      : 0;

    // Calculate Jenny and Pail values
    const jennyRate = 94.815;
    const pailRate = jennyRate * 500;

    let jennyPayment = payment * jennyRate;
    let pailPayment = payment * pailRate;

    // Generate amortization schedule
    const schedule = calculateAmortizationSchedule(principal, monthlyRate, numPayments, payment);

    // Set payments and schedule
    setData({ 
      ...data, 
      payment: `$${payment.toFixed(2)} is your payment`, 
      jennyPayment: `${jennyPayment.toFixed(2)} Jenny`, 
      pailPayment: `${pailPayment.toFixed(2)} Pail`,
      schedule
    });
  };

  useEffect(() => {
    if (isAltBackground) {
      document.body.classList.add('alt-background');
    } else {
      document.body.classList.remove('alt-background');
    }
  }, [isAltBackground]);

  const handleButtonClick = () => {
    setLayoutChanged(!layoutChanged); 
    setIsJenny(!isJenny); 
    setIsAltBackground(!isAltBackground); 
    setData(initialData);
  };

  return (
    <div className={`app-wrapper ${layoutChanged ? 'layout-changed' : ''}`}>
      <img
        src="/images/logo.png" // Replace with your image path
        alt="Toggle Layout and Currency"
        className="move-button"
        onClick={handleButtonClick}
      />

      {!layoutChanged ? (
        <div className="container">
          <Form {...data} handleInputChange={handleInputChange} calculatePayment={calculatePayment} />
          <Output payment={data.payment} isAltBackground={isAltBackground} jennyPayment={data.jennyPayment} pailPayment={data.pailPayment} />
          {/* Render AmortizationSchedule only if layout is not changed */}
          {data.schedule.length > 0 && <AmortizationSchedule schedule={data.schedule} />}
        </div>
      ) : (
        <>
          <div className="container form-container">
            <Form {...data} handleInputChange={handleInputChange} calculatePayment={calculatePayment} />
          </div>
          <div className="container output-container">
            <Output payment={data.payment} isAltBackground={isAltBackground} jennyPayment={data.jennyPayment} pailPayment={data.pailPayment} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
