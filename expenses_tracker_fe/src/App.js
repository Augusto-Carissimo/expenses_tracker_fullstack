import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalExpenses from './components/TotalExpenses';
import MonthlyExpenses from './components/MonthlyExpenses';
import TypeForm from './components/TypeForm';

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExpenses(data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = (expenseData) => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add expense');
        }
        return response.json();
      })
      .then(() => {
        fetchExpenses();
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  const handleDeleteExpense = (expenseId) => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete expense');
        }
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== expenseId));
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };

  const handleAddType = (typeData) => {
    fetch(`${process.env.REACT_APP_API_URL}/types/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: {
          name: typeData.name,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add type');
        }
      })
      .catch((error) => {
        console.error('Error adding type:', error);
      });
  };

  return (
    <div>
      <TypeForm onSubmit={handleAddType} />
      <ExpenseForm onSubmit={handleAddExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      <TotalExpenses />
      <MonthlyExpenses monthlyExpenses={expenses} />
    </div>
  );
}

export default App;
