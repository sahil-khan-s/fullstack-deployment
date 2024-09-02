// File: backend/src/controllers/userController.js

const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await userModel.addUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.deleteUser(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    addUser,
    deleteUser,
};
