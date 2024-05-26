import React from 'react';

function TypesList({ types, typeId, setTypeId }) {
  return (
    <div>
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
