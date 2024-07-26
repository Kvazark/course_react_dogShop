import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../utils/api/productsApi';
import { AppDispatch, RootState } from '../../types/store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	extra: Api;
}>();
