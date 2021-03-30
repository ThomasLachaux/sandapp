const { Router } = require('express');
const getSandwiches = require('./getSandwiches');
const addSandwich = require('./addSandwich');
const getSandwichById = require('./getSandwichById');
const updateSandwich = require('./updateSandwich');

const router = Router();

router.get('/', getSandwiches);
router.get('/:sandwichId', getSandwichById);
router.post('/', addSandwich);
router.post('/:sandwichId', updateSandwich);

module.exports = router;
