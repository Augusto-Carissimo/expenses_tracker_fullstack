import React, { useState, useEffect } from 'react';

function MonthlyExpenses() {
  const [monthly, setTotal] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses/monthly_expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTotal(data.monthly_expenses);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching types:', error);
      });
  }, []);

  const renderTotalExpenses = () => {
    if (typeof monthly === 'object' && monthly !== null) {
      return Object.keys(monthly).map((key) => (
        <div key={key}>
          {key}: {monthly[key]}%
        </div>
      ));
    }
    return <div>{monthly}</div>;
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>Monthly Expenses:</h3>
      {renderTotalExpenses()}
    </div>
  );
}

export default MonthlyExpenses;