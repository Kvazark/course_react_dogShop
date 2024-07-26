import { RequestStatus } from '../../../types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEditUser, fetchUser } from './thunk';
import { isActionPending, isActionRejected } from '../../../utils';

interface UserState {
	info: IUserBase | null;
	status: RequestStatus;
}

const initialState: UserState = {
	info: null,
	status: RequestStatus.Idle,
};

const USER_SLICE_NAME = 'user';
export const userSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserBase>) => {
			state.info = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.info = action.payload;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchEditUser.fulfilled, (state, action) => {
				state.info = action.payload;
				state.status = RequestStatus.Success;
			})
			.addMatcher(isActionPending(userSlice.name), (state) => {
				state.status = RequestStatus.Loading;
			})
			.addMatcher(isActionRejected(userSlice.name), (state) => {
				state.status = RequestStatus.Failed;
			});
	},

	selectors: {
		getUser: (state: UserState) => state.info,
		getUserStatus: (state: UserState) => state.status,
	},
});
