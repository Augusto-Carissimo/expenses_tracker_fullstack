import React from 'react';
import '../css/ExpenseList.css';

function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h3>Last expenses</h3>
      {expenses.map((expense) => (
        <div className="expense-item" key={expense.id}>
          <p className='expense-name'>{expense.expense_name ? expense.expense_name : <i>not specified</i>}</p>
          <p className='expense-cost'>${expense.cost}</p>
          <button className='expense-button' onClick={() => onDelete(expense.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
