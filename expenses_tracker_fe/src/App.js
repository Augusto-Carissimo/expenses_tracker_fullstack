import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalExpenses from './components/TotalExpenses';
import MonthlyExpenses from './components/MonthlyExpenses';
import TypeForm from './components/TypeForm';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [error, setError] = useState(null);

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

  const fetchTotalExpenses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses/total_expenses`, {
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
        setTotal(data.total_expenses);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching total expenses:', error);
      });
  };

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
        fetchTotalExpenses();
        fetchMonthlyExpenses(); // Ensure monthly expenses are updated
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
        fetchTotalExpenses();
        fetchMonthlyExpenses(); // Ensure monthly expenses are updated
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

  const fetchMonthlyExpenses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/expenses/monthly_expenses`, {
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
        setMonthlyExpenses(data.monthly_expenses);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching monthly expenses:', error);
      });
  };

  useEffect(() => {
    fetchExpenses();
    fetchTotalExpenses();
    fetchMonthlyExpenses();
  }, []);

  return (
    <div className="container">
      <div className="sidebar1">
        <ExpenseForm onSubmit={handleAddExpense} />
      </div>
      <div className="sidebar2">
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      </div>
      <div className="footer">
        <TypeForm onSubmit={handleAddType} />
      </div>
      <div className="main1">
        <MonthlyExpenses monthlyExpenses={monthlyExpenses} error={error} />
      </div>
      <div className="main2">
        <TotalExpenses total={total} error={error} />
      </div>
    </div>
  );
}

export default App;
