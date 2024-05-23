import React, { useState } from 'react';
import TypesList from './TypesList';
import '../css/ExpenseForm.css';

function ExpenseForm({ onSubmit }) {
  const [expenseName, setExpenseName] = useState('');
  const [cost, setCost] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [typeId, setTypeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      expense: {
        expense_name: expenseName,
        cost: parseFloat(cost),
        created_at: createdAt,
        type_id: typeId,
      },
    };
    onSubmit(expenseData);
    setExpenseName('');
    setCost('');
    setCreatedAt('');
    setTypeId('');
  };

  return (
    <div>
      <h3>Add new Expense</h3>
      <div className="container-expense-form">
        <form onSubmit={handleSubmit}>
          <div className="name-form">
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Expense Name"
            />
          </div>
          <div className="cost-form">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              step="0.01"
              placeholder="Cost"
            />
          </div>
          <div className="date-form">
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              placeholder="Created At"
            />
          </div>
          <div className="type-form">
            <TypesList typeId={typeId} setTypeId={setTypeId} />
          </div>
          <div className="submit-button">
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
