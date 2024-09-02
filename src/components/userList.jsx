"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../counter/counterSlice";

const UserList = () => {
  const users = useSelector((state) => state.counter.users);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (name && email) {
      dispatch(addUser(name, email))
        .then(() => {
          setName(""); // Reset name input
          setEmail(""); // Reset email input
        })
        .catch((error) => {
          alert("Failed to add user. Please try again."); // Show error message
          console.error("Error adding user:", error);
        });
    } else {
      alert("Name and email must be provided.");
    }
  };

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId))
        .then(() => {
          alert("User deleted successfully!"); // Show success message
        })
        .catch((error) => {
          alert("Failed to delete user. Please try again."); // Show error message
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div className="container  mx-auto p-4">
        <div className=" mb-6 text-center">
                <h1 className="text-3xl font-bold text-white">Tech Stack </h1>
                <p className="text-white font-medium text-[19px] mt-2 max-w-[800px] mx-auto">
                    This full-stack application is built using Vite and React for the frontend, Express.js for the backend, PostgreSQL as the database, and Prisma as the ORM..
                </p>
            </div>
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg p-8 border shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>

      <div className="w-full max-w-xl mx-auto mt-8 bg-white rounded-lg border p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-start px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b text-start">Email</th>
              <th className="py-2 px-4 border-b text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(users) ? (
            users.map((user) => (
                <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <p>No users available.</p>
        )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
