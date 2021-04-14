const { Router } = require('express');
const getUsers = require('./getUsers');
const getUserById = require('./getUserById');
const switchUserAsAdmin = require('./switchUserAsAdmin');
const getSelf = require('./getSelf');
const updateSelf = require('./updateSelf');
const deleteUser = require('./deleteUser');
const getOrdersForSelf = require('./getOrdersForSelf');
const ensureAdmin = require('../../middlewares/ensureAdmin');
const { validateBody, validateParams } = require('../../middlewares/validate');
const { IdSchema, UserSchema } = require('../../utils/validate');

const router = Router();
const validateUser = validateBody(UserSchema);
const validateId = validateParams(IdSchema);

router.get('/', ensureAdmin, getUsers);
router.get('/me', getSelf);
router.get('/:userId', ensureAdmin, getUserById);
router.get('/me/orders', getOrdersForSelf);
router.patch('/me', validateUser, updateSelf);
router.patch('/:id/admin', ensureAdmin, validateId, switchUserAsAdmin);
router.delete('/:id', ensureAdmin, validateId, deleteUser);

module.exports = router;
