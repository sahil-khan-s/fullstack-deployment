// userController.js
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
        
        const profile = "null"

        const newUser = await userModel.addUser(name, email , profile );
        console.log(newUser , "useeeerrrrrrrrrr")
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
