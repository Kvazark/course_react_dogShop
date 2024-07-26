import { SearchIcon } from '../../images';
import './seacrhStyled.scss';
import { Button } from '../ui';
import React, { useState } from 'react';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { useAppDispatch } from '../../storage/hooks';
import { fetchProducts } from '../../storage/slices/products/thunk';
import { productsActions } from '../../storage/slices/products';

export const Search = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector((state) => state.products.searchTerm);
	const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		if (!term) {
			dispatch(fetchProducts({ searchQuery: '' }));
			dispatch(productsActions.updateSearchTerm(''));
		}
		setCurrentSearchTerm(term);
	};
	const handleSearchSubmit = () => {
		dispatch(productsActions.updateSearchTerm(currentSearchTerm));
		dispatch(productsActions.fetchProducts({ searchQuery: currentSearchTerm }));
	};

	return (
		<div className='input-wrapper'>
			<input
				placeholder='Поиск'
				value={currentSearchTerm}
				onChange={handleSearch}
			/>
			<Button
				label={<SearchIcon />}
				view='transparent'
				onClick={() => handleSearchSubmit()}
			/>
		</div>
	);
};
