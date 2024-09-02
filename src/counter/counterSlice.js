import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        users: [],
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { increment, decrement, setUsers } = counterSlice.actions;
// Thunks in your Redux slice (e.g., counterSlice.js)

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await fetch('https://fullstack-deployment-2.onrender.com/api/users'); // Correct path to fetch users
        const data = await response.json();
        console.log(data , "users")
        dispatch(setUsers(data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const addUser = (name, email) => async (dispatch) => {
    try {
        const response = await fetch('https://fullstack-deployment-2.onrender.com/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to add user: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('User added successfully:', result);
        dispatch(fetchUsers()); // Refresh users list after adding a new user
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
};


export const deleteUser = (id) => async (dispatch) => {
    try {
        await fetch(`https://fullstack-deployment-2.onrender.com/api/users/${id}`, { // Correct path to delete user
            method: 'DELETE',
        });
        dispatch(fetchUsers()); // Refresh users list after deletion
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};


export default counterSlice.reducer;
