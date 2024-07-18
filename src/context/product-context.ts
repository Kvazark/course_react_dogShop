import { createContext } from 'react';

export interface ProductContextInterface {
	products: IProduct[];
	onProductLike: (
		productData: ProductLikeParam
	) => Promise<IProduct | undefined>;

	searchTerm: string;
	onSetSearchTerm: (term: string) => void;
}

export const ProductContext = createContext<ProductContextInterface | null>(
	null
);
ProductContext.displayName = 'ProductContext';
