import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export interface SearchFiltersProps {
	isMobile: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = () => {
	const theme = useTheme();

	// TODO: Mobile version

	return (
		<div
			css={css`
				position: sticky;
				top: 0;
				padding: ${theme.spacing(3)};
			`}
		>
			<Typography variant="h6">Filters</Typography>
		</div>
	);
};

export default SearchFilters;
