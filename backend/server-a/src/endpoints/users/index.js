const { Router } = require('express');
const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const switchUserAsAdmin = require('./switchUserAsAdmin');
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
router.patch('/me', updateSelf);
router.patch('/:userId/admin', ensureAdmin, switchUserAsAdmin);
router.delete('/:userId', ensureAdmin, deleteUser);

module.exports = router;
