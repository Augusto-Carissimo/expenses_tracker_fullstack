import React, { useState } from 'react';

function TypeForm({ onSubmit }) {
  const [typeName, setTypeName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: typeName });
    setTypeName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input type="text" value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder="Type Name" /><br />
      </p>
      <p>
        <button type="submit">Add New Type of Expense</button>
      </p>
    </form>
  );
}

export default TypeForm;