const { Router } = require('express');
const getSandwiches = require('./getSandwiches');
const addSandwich = require('./addSandwich');
const getSandwichById = require('./getSandwichById');
const updateSandwich = require('./updateSandwich');
const deleteSandwich = require('./deleteSandwich');
const ensureAdmin = require('../../middlewares/ensureAdmin');
const { SandwichSchema, IdSchema } = require('../../utils/validate');
const { validateBody, validateParams } = require('../../middlewares/validate');

const router = Router();
const validateSandwich = validateBody(SandwichSchema);
const validateId = validateParams(IdSchema);

router.get('/', getSandwiches);
router.get('/:sandwichId', getSandwichById);
router.post('/', ensureAdmin, validateSandwich, addSandwich);
router.put('/:id', ensureAdmin, validateId, validateSandwich, updateSandwich);
router.delete('/:id', ensureAdmin, validateId, deleteSandwich);

module.exports = router;
