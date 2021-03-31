const { Router } = require('express');
const getSandwiches = require('./getSandwiches');
const addSandwich = require('./addSandwich');
const getSandwichById = require('./getSandwichById');
const updateSandwich = require('./updateSandwich');
const deleteSandwich = require('./deleteSandwich');
const ensureAdmin = require('../../middlewares/ensureAdmin');

const router = Router();

router.get('/', getSandwiches);
router.get('/:sandwichId', getSandwichById);
router.post('/', ensureAdmin, addSandwich);
router.put('/:sandwichId', ensureAdmin, updateSandwich);
router.delete('/:sandwichId', ensureAdmin, deleteSandwich);

module.exports = router;
