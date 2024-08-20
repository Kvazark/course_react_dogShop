import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

const SEARCH_PHRASE_QUERY_PARAM_NAME = 'q';

export interface UseProductsSearchFormParams {
	setProductsSearchFilter: (newFilter: ProductsSearchFilter) => void;
}

export const useProductsSearchForm = ({
	setProductsSearchFilter,
}: UseProductsSearchFormParams) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [searchValue, setSearchValue] = useState(() => {
		return searchParams.get(SEARCH_PHRASE_QUERY_PARAM_NAME) ?? '';
	});

	const optimizedValue = useDebounce(searchValue, 1e3);

	useEffect(() => {
		setProductsSearchFilter({
			searchTerm: optimizedValue,
			page: 1,
		});
	}, [optimizedValue, setProductsSearchFilter]);

	useEffect(() => {
		if (searchValue === searchParams.get(SEARCH_PHRASE_QUERY_PARAM_NAME)) {
			return;
		}
		if (searchValue) {
			searchParams.set(SEARCH_PHRASE_QUERY_PARAM_NAME, searchValue);
		} else {
			searchParams.delete(SEARCH_PHRASE_QUERY_PARAM_NAME);
		}

		setSearchParams(searchParams);
	}, [searchParams, searchValue]);

	return {
		searchValue,
		setSearchValue,
	};
};
