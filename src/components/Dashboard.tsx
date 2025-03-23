import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Welcome, {auth.currentUser?.email}</h1>
      {error && <p>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;