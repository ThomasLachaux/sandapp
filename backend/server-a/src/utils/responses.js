const errors = {
  orderNotFound: 'The order could not be found.',
  sandwichNotFound: 'The sandwich could not be found.',
  userNotFound: 'The user could not be found.',
  wrongCredentials: 'Username or password invalid.',
  cannotDeleteSelf: 'You cannot delete yourself.',
  authenticationError: 'Authentication error.',
  usernameAlreadyExists: 'Username already exists.',
  cannotSetSelfAsAdmin: 'You cannot set or unset yourself as admin.',
  forbiddenAccess: 'Access forbidden.',
  requiredValuesMissing: 'Required values missing',
  invalidId: 'Invalid id',
};

const ok = (res, body) => res.status(200).json(body);
const created = (res, body) => res.status(201).json(body);
const unauthorized = (res, error) => res.status(401).json({ error });
const forbidden = (res, error) => res.status(403).json({ error });
const notFound = (res, error) => res.status(404).json({ error });
const badRequest = (res, error) => res.status(400).json({ error });

module.exports = {
  errors,
  ok,
  created,
  unauthorized,
  forbidden,
  notFound,
  badRequest,
};
