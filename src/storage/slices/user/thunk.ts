import { UserUpdateDto } from '../../../utils/api/productsApi';
import { createAppAsyncThunk } from '../../hooks';

export const fetchUser = createAppAsyncThunk<IUserBase>(
	'user/fetchUser',
	async (_, { extra: api, rejectWithValue }) => {
		try {
			return await api.getUserInfo();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchEditUser = createAppAsyncThunk<IUserBase, UserUpdateDto>(
	'user/fetchEditUser',
	async (dataUser, { extra: api, rejectWithValue }) => {
		try {
			return api.setUserInfo(dataUser);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

console.dir(fetchUser);
