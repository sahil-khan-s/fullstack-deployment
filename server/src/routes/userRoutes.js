// File: backend/src/routes/userRoutes.js
// Corrected userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlller'); // Fixed typo here

router.get('/', userController.getUsers);
router.post('/', userController.addUser); // Use controller method directly
router.delete('/:id', userController.deleteUser); 

module.exports = router;

