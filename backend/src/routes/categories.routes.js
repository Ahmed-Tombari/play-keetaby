const express = require('express');
const ctrl = require('../controllers/categories.controller');

const router = express.Router();

router.get('/', ctrl.listCategories);
router.get('/:id', ctrl.getCategory);
router.post('/', ctrl.createCategory);
router.patch('/:id', ctrl.updateCategory);
router.delete('/:id', ctrl.deleteCategory);

module.exports = router;
