import React from 'react';

const Form = ({ balance, rate, term, handleInputChange, calculatePayment }) => (
  <form>
    <div className="form-group">
      <label>Loan Balance</label>
      <input type="number" name="balance" value={balance} onChange={handleInputChange} className="form-control" placeholder="Loan balance" />
    </div>

    <div className="form-group">
      <label>APR</label>
      <input type="number" name="rate" value={rate} onChange={handleInputChange} className="form-control" placeholder="APR" step="0.01" />
    </div>

    <div className="form-group">
      <label>Loan Term</label>
      <select name="term" value={term} onChange={handleInputChange} className="form-control">
        <option value="15">15 Years</option>
        <option value="30">30 Years</option>
      </select>
    </div>

    <button type="button" onClick={calculatePayment} className="btn btn-primary">Calculate Payment</button>
  </form>
);

export default Form;
