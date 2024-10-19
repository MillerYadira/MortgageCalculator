import React from 'react';

const Output = ({ payment, isAltBackground, jennyPayment, pailPayment }) => (
  <div className="mt-4">
    <label>Monthly Payment:</label>
    <div className="output-box">
      {!isAltBackground ? (
        <>{payment}</>
      ) : (
        <>
          <div>{jennyPayment}</div>
          <div>{pailPayment}</div>
        </>
      )}
    </div>
  </div>
);

export default Output;
