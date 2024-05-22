import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0088'];

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
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>Monthly Expenses:</h3>
      {monthlyExpenses.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={monthlyExpenses}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label={renderCustomLabel}
          >
            {monthlyExpenses.map((entry, index) => (
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
