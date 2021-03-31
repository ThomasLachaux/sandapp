export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SANDWICHES':
      return action.payload;
  }

  return state;
};
