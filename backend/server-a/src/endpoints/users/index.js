const { Router } = require('express');
const getUserById = require('./getUserById');
// const setUserAsAdmin = require('./setUserAsAdmin');
const updateUser = require('./updateUser');
// const deleteUser = require('./deleteUser');

const router = Router();

router.get('/:userId', getUserById);
// router.patch('/:userId', setUserAsAdmin);
router.patch('/:userId', updateUser);
// router.delete('/:userId', deleteUser);

module.exports = router;
