module.exports = [
  // eslint-disable-next-line no-unused-vars
  (err, req, res, next) => res.status(500).json({ error: 'error', details: err.message }),
];
