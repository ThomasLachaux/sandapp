const errors = {
  orderNotFound: 'The order could not be found.',
  sandwichNotFound: 'The sandwich could not be found.',
};

const ok = (res, body) => res.status(200).json(body);
const notFound = (res, error) => res.status(404).json({ error });

module.exports = { errors, ok, notFound };
