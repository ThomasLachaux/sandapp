const errors = {
  orderNotFound: 'The order could not be found.',
  sandwichNotFound: 'The sandwich could not be found.',
  userNotFound: 'The user could not be found.',
  wrongCredentials: 'Username or password invalid.'
};

const ok = (res, body) => res.status(200).json(body);
const created = (res, body) => res.status(201).json(body);
const unauthorized = (res, error) => res.status(401).json({ error });
const notFound = (res, error) => res.status(404).json({ error });

module.exports = {
  errors,
  ok,
  created,
  unauthorized,
  notFound,
};
