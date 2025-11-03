const express = require('express');
const router = express.Router();
const { submitContactForm, getContacts } = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', submitContactForm);

// GET /api/contact - Get all contact submissions (optional, for admin)
router.get('/', getContacts);

module.exports = router;