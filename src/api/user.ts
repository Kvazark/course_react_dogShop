import { customBaseQuery } from './config';
import { createApi } from '@reduxjs/toolkit/query/react';

export type UserUpdateDto = Partial<
	Omit<IUserBase, 'likesProducts' | 'id'> & { password: string }
>;
export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: customBaseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<IUserBase, void>({
			query: () => ({
				url: 'users/me',
				method: 'GET',
			}),
			providesTags: (result) => (result ? ['User'] : []),
		}),
		updateUser: builder.mutation<IUserBase, UserUpdateDto>({
			query: (dataUpdate: UserUpdateDto) => ({
				url: 'users/me',
				method: 'PATCH',
				body: dataUpdate,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
