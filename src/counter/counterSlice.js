import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        users: [],
    },
    reducers: {
      
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { increment, decrement, setUsers } = counterSlice.actions;
// Thunks in your Redux slice (e.g., counterSlice.js)
export const addUser = (name, email) => async (dispatch) => {
    try {
        const response = await fetch('https://vite-server-va0p.onrender.com/api/users', { // Corrected URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        console.log(response, "sss")
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

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await fetch('https://vite-server-va0p.onrender.com/api/users'); // Corrected URL
        const data = await response.json();
        console.log(data, "users"); // Debugging log to check the fetched data
        if (Array.isArray(data)) {
            dispatch(setUsers(data));
        } else {
            console.error('Fetched data is not an array:', data);
            dispatch(setUsers([])); // Set users to an empty array to avoid errors
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        dispatch(setUsers([])); // Set users to an empty array to avoid errors
    }
};


export const deleteUser = (id) => async (dispatch) => {
    try {
        await fetch(`https://vite-server-va0p.onrender.com/api/users/${id}`, { // Corrected URL
            method: 'DELETE',
        });
        dispatch(fetchUsers()); // Refresh users list after deletion
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};


export default counterSlice.reducer;
