import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import '../css/MonthlyExpenses.css';

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

function MonthlyExpenses({ monthlyExpenses, error }) {
  const data = monthlyExpenses.length > 0 ? monthlyExpenses : [{ name: 'add Type of expense', value: 1 }];
  const isEmptyData = monthlyExpenses.length === 0;

  return (
    <div className="monthly-expenses-container">
      {error && <p>Error: {error.message}</p>}
      <h3 className="monthly-expenses-title">Monthly Expenses</h3>
      <PieChart width={600} height={300} className="pie-chart">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={300}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={isEmptyData ? '#e0e0e0' : COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default MonthlyExpenses;
