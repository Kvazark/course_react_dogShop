import { SearchIcon } from '../../images';
import './seacrhStyled.scss';
import { Button } from '../ui';
import React, { useContext, useState } from 'react';
import {
	ProductContext,
	ProductContextInterface,
} from '../../context/product-context';

export const Search = () => {
	const { searchTerm, onSetSearchTerm } = useContext(
		ProductContext
	) as ProductContextInterface;

	const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		if (!term) onSetSearchTerm('');
		setCurrentSearchTerm(term);
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
				onClick={() => onSetSearchTerm(currentSearchTerm)}
			/>
		</div>
	);
};
