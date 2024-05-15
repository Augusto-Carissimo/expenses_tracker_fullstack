import './App.css';
import React, { useState } from 'react';


function App() {
  const [test, setTest] = React.useState([]);

  const fetchTest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/test`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTest(data);
      })
      .catch(error => {
        console.error('Error fetching test endpoint:', error);
      });
  };

  React.useEffect(() => {
    fetchTest();
  }, []);

  return (
    <div className="App">
      {test}
    </div>
  );
}

export default App;
