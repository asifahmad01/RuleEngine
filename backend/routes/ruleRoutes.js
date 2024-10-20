const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

router.post('/createRule', ruleController.createRule);
router.post('/combineRules', ruleController.combineRules);
router.post('/evaluateRule', ruleController.evaluateRule);

module.exports = router;
