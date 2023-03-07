import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Dahsboard() {
  useEffect(() => {
    const getProtectedData = async (token) => {
      try {
        const response = await axios.get('http://localhost:3000/auth', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProtectedData(localStorage.getItem('authToken'));
  }, []);

  return localStorage.getItem('isAuth') ? (
    <div className='App'>
      <h1>Dashboard</h1>
      <ToastContainer />
    </div>
  ) : (
    false
  );
}
