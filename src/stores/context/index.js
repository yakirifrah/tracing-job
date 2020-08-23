import React, { createContext, useContext } from 'react';
import { createRootStore } from '../index';
import { useLocalStore } from 'mobx-react';


export const Context = createContext(createRootStore);


export const RootProvider = ({ children }) => {

    const store = useLocalStore(createRootStore);

    return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useRootStore = () => useContext(Context);


