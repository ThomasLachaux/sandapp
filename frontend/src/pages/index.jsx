import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router as ReachRouter } from '@reach/router';
import Order from './Order';
import Login from './Login';
import PastOrders from './PastOrders';
import Admin from './Admin';
import api from '../utils/api';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const orders = await api.get('sandwiches');

      dispatch({ type: 'SET_SANDWICHES', payload: orders.data });
    };

    fetchData();
  }, []);

  return (
    <ReachRouter primary={false}>
      <Order path="/" />
      <PastOrders path="/past-orders" />
      <Login path="/login" />
      <Admin path="/admin" />
    </ReachRouter>
  );
};
export default Router;
