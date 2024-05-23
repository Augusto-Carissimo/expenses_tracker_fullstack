import React, { useState } from 'react';
import '../css/TypeForm.css'

function TypeForm({ onSubmit }) {
  const [typeName, setTypeName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: typeName });
    setTypeName('');
  };

  return (
    <div className='container-type-form'>
      <h3 className='title-type-form'>Add new Type of expense</h3>
      <form className='form-type-form' onSubmit={handleSubmit}>
        <p>
          <input type="text" value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder="New Type Name" /><br />
        </p>
        <p>
          <button className='button-type-form' type="submit">Add New Type of Expense</button>
        </p>
      </form>
    </div>

  );
}

export default TypeForm;