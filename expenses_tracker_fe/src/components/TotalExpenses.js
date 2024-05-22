import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0088'];

function TotalExpenses({ total, error }) {
  console.log(total)
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>Total Expenses:</h3>
      {total.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={total}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {total.map((entry, index) => (
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

export default TotalExpenses;
