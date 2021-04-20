import Typography from '@material-ui/core/Typography';
import React from 'react';
import RoundedBox from '../RoundedBox';

export interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
	return (
		<RoundedBox padding={3}>
			<Typography variant="h6">Search...</Typography>
		</RoundedBox>
	);
};

export default SearchBar;
