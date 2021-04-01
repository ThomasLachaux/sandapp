module.exports = [
  // eslint-disable-next-line no-unused-vars
  (err, req, res, next) => {
    if (err.code === 11000) {
      return res.status(409).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: err.message });
  },
];
