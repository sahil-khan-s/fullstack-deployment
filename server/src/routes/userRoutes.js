// File: backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlller');

router.get('/', userController.getUsers);
router.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await addUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error in backend:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.delete('/:id', userController.deleteUser); // Delete user route

module.exports = router;
