import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0088'];

function MonthlyExpenses({ monthlyExpenses, error }) {
  const [monthly, setMonthly] = useState([]);

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
        setMonthly(data.monthly_expenses);
      })
      .catch((error) => {
        console.error('Error fetching monthly expenses:', error);
      });
  }, []);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>Monthly Expenses:</h3>
      {monthly.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={monthly}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {monthly.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default MonthlyExpenses;
