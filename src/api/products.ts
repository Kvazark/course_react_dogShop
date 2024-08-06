import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import {
	IAddReview,
	IAddReviewResponse,
	IAverageRating,
	IProductLikeDto,
	IProductListResponse,
} from './interfaces';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Products', 'Product'],
	endpoints: (builder) => ({
		getProducts: builder.query<IProductListResponse, ProductsSearchFilter>({
			query: ({ page, searchTerm }) => ({
				url: '/products',
				params: {
					sort: 'newest',
					searchTerm,
					perPage: 6,
					page,
				},
			}),
			serializeQueryArgs: ({ endpointName, queryArgs: { searchTerm } }) => {
				return endpointName + searchTerm;
			},
			merge: (currentCache, response, { arg: { page } }) => {
				if (page === 1) {
					currentCache = response;
					return;
				}
				currentCache.products.push(...response.products);
			},
			forceRefetch: ({ currentArg, previousArg }) => {
				return currentArg?.page !== previousArg?.page;
			},

			providesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		getProduct: builder.query<IProduct, string>({
			query: (id) => ({
				url: `/products/${id}`,
			}),
			providesTags: (response) => [{ type: 'Products', id: response?.id }],
		}),
		setLikeProduct: builder.mutation<IProduct[], IProductLikeDto>({
			query: ({ like, productId }) => ({
				url: `products/${productId}/likes`,
				method: like ? 'DELETE' : 'PUT',
			}),
			invalidatesTags: [
				{ type: 'Products', id: 'LIST' },
				{ type: 'Product', id: 'DETAIL' },
			],
		}),
		getReviewsProductById: builder.query<IReview[], string>({
			query: (productID) => ({
				url: `/reviews/${productID}`,
			}),
			providesTags: (response, error, productID) => [
				{ type: 'Products', id: productID },
			],
		}),
		addReviewProductById: builder.mutation<
			IAddReviewResponse,
			{ productId: string; review: IAddReview }
		>({
			query({ productId, review }) {
				return {
					url: `/reviews/leave/${productId}`,
					method: 'POST',
					body: review,
				};
			},
			invalidatesTags: (response, error, { productId }) => [
				{ type: 'Products', id: productId },
			],
		}),
		getAverageRatingForProduct: builder.query<IAverageRating, string>({
			query: (productId) => ({
				url: `/reviews/average-by-product/${productId}`,
			}),
		}),
		deleteProduct: builder.mutation<IProduct, Pick<IProduct, 'id'>>({
			query({ id }) {
				return {
					url: `products/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (response) => [
				{
					type: 'Products',
					id: 'LIST',
				},
				{ type: 'Products', id: response?.id },
			],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useSetLikeProductMutation,
	useGetReviewsProductByIdQuery,
	useAddReviewProductByIdMutation,
	useGetAverageRatingForProductQuery,
	useDeleteProductMutation,
} = productsApi;
