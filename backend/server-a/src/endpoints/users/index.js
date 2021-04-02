const { Router } = require('express');
const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const setUserAsAdmin = require('./setUserAsAdmin');
const getSelf = require('./getSelf');
const updateSelf = require('./updateSelf');
const deleteUser = require('./deleteUser');
const getOrdersForSelf = require('./getOrdersForSelf');
const ensureAdmin = require('../../middlewares/ensureAdmin');

const router = Router();

router.get('/', ensureAdmin, getUsers);
router.get('/me', getSelf);
router.get('/:userId', ensureAdmin, getUserById);
router.get('/me/orders', getOrdersForSelf);
router.patch('/:userId', ensureAdmin, setUserAsAdmin);
router.patch('/me', updateSelf);
router.delete('/:userId', ensureAdmin, deleteUser);

module.exports = router;
