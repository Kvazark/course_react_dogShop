import { SearchIcon } from '../../assets/images';
import './seacrhStyled.scss';
import { Button } from '../ui';
import { useProductsSearchForm } from '../../hooks/useProductsSearchForm';
import { useAppDispatch } from '../../storage/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { productsActions } from '../../storage/slices/products';
import React, { useState } from 'react';

export const Search = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [localValue, setLocalValue] = useState('');
	const { setSearchValue } = useProductsSearchForm({
		setProductsSearchFilter: (newFilter) => {
			dispatch(productsActions.setSearchFilter(newFilter));
		},
	});

	const handleSearchSubmit = () => {
		if (location.pathname !== '/catalog') {
			if (localValue) setSearchValue(localValue);
			setTimeout(() => {
				navigate('/catalog');
			}, 1000);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (location.pathname === '/catalog') {
			setSearchValue(e.target.value);
			setLocalValue(e.target.value);
		} else {
			setLocalValue(e.target.value);
		}
	};

	return (
		<div className='input-wrapper'>
			<input placeholder='Поиск' value={localValue} onChange={handleChange} />
			<Button
				label={<SearchIcon />}
				view='transparent'
				onClick={() => handleSearchSubmit()}
			/>
		</div>
	);
};
