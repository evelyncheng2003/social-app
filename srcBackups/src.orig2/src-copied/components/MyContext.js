import { React, useState, createContext } from 'react';

export const MyContext = createContext({
    user: "",
    setUser: () => { }
});

