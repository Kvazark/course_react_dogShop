import { createContext } from 'react';

export const UserContext = createContext<IUserBase | null>(null);
UserContext.displayName = 'UserContext';
