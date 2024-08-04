import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	info: Partial<IUserBase> | null;
	accessToken: string;
}

const createInitState = (): UserState => ({
	info: null,
	accessToken: '',
});

const USER_SLICE_NAME = 'user';
export const userSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState: createInitState(),
	reducers: {
		setAccessToken(state, action: PayloadAction<Pick<Token, 'accessToken'>>) {
			state.accessToken = action.payload.accessToken;
		},
		clearUser() {
			return createInitState();
		},
		updateUserInfo: (state, action: PayloadAction<Partial<IUserBase>>) => {
			if (state.info) {
				state.info = { ...state.info, ...action.payload };
			}
		},
		setUser: (state, action: PayloadAction<UserState['info']>) => {
			state.info = action.payload;
		},
	},
	selectors: {
		getUser: (state: UserState) => state.info,
		accessTokenSelector: (state: Token) => state.accessToken,
	},
});
