// File: backend/src/models/userModel.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchUsers() {
  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

fetchUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const getUsers = async () => {
    return await prisma.user.findMany(); // Fetch all users
};

const addUser = async (name, email) => {
    return await prisma.user.create({
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
