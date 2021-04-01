import api from '../utils/api';

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('token', action.payload.token);
      api.defaults.headers.Authorization = `Bearer ${action.payload.token}`;
      return action.payload;

    case 'CLEAR_USER':
      localStorage.removeItem('token');
      api.defaults.headers.Authorization = '';
      return {};
  }

  return state;
};

export const loadUser = async (dispatch, user, token) => {
  dispatch({ type: 'SET_USER', payload: { ...user, token } });
  api.defaults.headers.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};
