import React from 'react';

const AmortizationSchedule = ({ schedule }) => (
  <div className="amortization-schedule">
    <label>Amortization Schedule</label>
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Payment</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((row) => (
          <tr key={row.month}>
            <td>{row.month}</td>
            <td>${row.payment}</td>
            <td>${row.interest}</td>
            <td>${row.principal}</td>
            <td>${row.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AmortizationSchedule;
