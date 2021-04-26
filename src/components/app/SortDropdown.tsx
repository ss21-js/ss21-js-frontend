import React from 'react';
import { css } from '@emotion/react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useTheme } from '@material-ui/core';

interface SortDropdownProps {
	children: React.ReactNode;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ children }) => {
	const theme = useTheme();

	return (
		<FormControl
			css={css`
				margin: ${theme.spacing(1)};
				display: inline;
				width: 100%;
			`}
		>
			<FormLabel>Sortieren nach: </FormLabel>
			{children}
		</FormControl>
	);
};

export default SortDropdown;
