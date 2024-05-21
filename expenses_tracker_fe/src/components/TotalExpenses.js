import React, { useState, useEffect } from 'react';

function TotalExpenses() {
  const [total, setTotal] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses/total_expenses`, {
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
        setTotal(data.total_expenses);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching types:', error);
      });
  }, []);

  const renderTotalExpenses = () => {
    if (typeof total === 'object' && total !== null) {
      return Object.keys(total).map((key) => (
        <div key={key}>
          {key}: {total[key]}%
        </div>
      ));
    }
    return <div>{total}</div>;
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>Total Expenses:</h3>
      {renderTotalExpenses()}
    </div>
  );
}

export default TotalExpenses;