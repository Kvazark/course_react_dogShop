import { fetchUser } from './thunk';
import { userSlice } from './user-slice';

export const userActions = { ...userSlice.actions, fetchUser };
export const userSelectors = userSlice.selectors;
