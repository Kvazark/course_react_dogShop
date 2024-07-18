import '../global.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { useEffect, useState } from 'react';
import { ProductContext } from '../context/product-context';
import { UserContext } from '../context/user-context';
import api from '../utils/api/productsApi';
import { isLiked } from '../utils/product';
import './appStyled.scss';

export const App = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const [products, setProducts] = useState<IProduct[]>([]);
	const [currentUser, setCurrentUser] = useState<IUserBase | null>(null);

	useEffect(() => {
		api.getAllInfo(searchTerm).then(([productData, userData]) => {
			setProducts(productData.products);
			setCurrentUser(userData);
		});
	}, [searchTerm]);

	async function handleProductLike(productData: ProductLikeParam) {
		try {
			const like = isLiked(productData.likes, currentUser?.id);
			await api.changeLikeProductStatus(productData.id, like);
			const updateProduct = await api.getProductById(productData.id);
			const newProduct = products.map((currentProduct) =>
				currentProduct.id === updateProduct.id ? updateProduct : currentProduct
			);
			setProducts(newProduct);
			return updateProduct;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<UserContext.Provider value={currentUser}>
			<ProductContext.Provider
				value={{
					products,
					onProductLike: handleProductLike,
					searchTerm,
					onSetSearchTerm: setSearchTerm,
				}}>
				<Header />
				<div className='wrapper-page'>
					<Outlet />
				</div>
				<Footer />
			</ProductContext.Provider>
		</UserContext.Provider>
	);
};
