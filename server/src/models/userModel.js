// File: backend/src/models/userModel.js

const prisma = require('../config/prismaClient'); // Import the prisma client

const getUsers = async () => {
    return await prisma.user.findMany(); // Fetch all users
};

const addUser = async (name, email) => {
    return await prisma.user.add({
        data: {
            name,  
            email, 
        },
    });
};


const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: id, // Use the ID to delete the user
        },
    });
};

module.exports = {
    getUsers,
    addUser,
    deleteUser,
};
