import React, { useState } from 'react';
import TypesList from './TypesList';

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
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Expense Name"
        />
        <br />
      </p>
      <p>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          step="0.01"
          placeholder="Cost"
        />
        <br />
      </p>
      <p>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          placeholder="Created At"
        />
        <br />
      </p>
      <TypesList typeId={typeId} setTypeId={setTypeId} />
      <p>
        <button type="submit">Add Expense</button>
      </p>
    </form>
  );
}

export default ExpenseForm;
