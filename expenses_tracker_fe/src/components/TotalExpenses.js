import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import '../css/TotalExpenses.css';

const COLORS = ['#8D9AD3', '#D3CC8D', '#8DD3C7', '#D38DA4', '#D3998D'];

const renderCustomLabel = ({ name, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name}
    </text>
  );
};

function TotalExpenses({ total, error }) {
  return (
    <div className="total-expenses-container">
      {error && <p>Error: {error.message}</p>}
      <h3 className="total-expenses-title">Total Expenses</h3>
      {total.length > 0 ? (
        <PieChart width={600} height={300} className="pie-chart">
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={total}
            cx={300}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            label={renderCustomLabel}
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
