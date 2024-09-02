"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUsers } from './counter/counterSlice';
import UserList from './components/userList';

function App() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
           
            <div>

            <UserList />
            </div>
        </>
    );
}

export default App;
