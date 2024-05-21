import React from 'react';

function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h3>Last expenses:</h3>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>{expense.expense_name} - {expense.cost}</p>
          <button onClick={() => onDelete(expense.id)}>Delete Expense</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
