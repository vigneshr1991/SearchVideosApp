/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const SearchController = require('../controllers/SearchController');

router.get('/', SearchController.search);
router.get('/test', SearchController.test);

module.exports = router;
