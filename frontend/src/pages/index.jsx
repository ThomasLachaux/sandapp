import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Router as ReachRouter } from '@reach/router';
import Order from './Order';
import Login from './Login';
import PastOrders from './PastOrders';
import Admin from './Admin';
import api from '../utils/api';
import { loadUser } from '../reducers/user';

const Router = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      api
        .get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          loadUser(dispatch, response.data, token);
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    loaded && (
      <ReachRouter primary={false}>
        {user.token ? (
          <>
            <Order path="/" />
            <PastOrders path="/past-orders" />
            {user.isAdmin && <Admin path="/admin" />}

            <Redirect default from="/" to="/" noThrow />
          </>
        ) : (
          <>
            <Redirect default from="/" to="/login" noThrow />
          </>
        )}
        <Login path="/login" />
      </ReachRouter>
    )
  );
};
export default Router;
