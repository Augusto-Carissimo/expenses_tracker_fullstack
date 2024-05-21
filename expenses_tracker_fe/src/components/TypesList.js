import React, { useState, useEffect } from 'react';

function TypesList({ typeId, setTypeId }) {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/types/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTypes(data);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching types:', error);
      });
  }, []);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypesList;
