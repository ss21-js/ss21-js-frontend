import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

export interface SearchBarTabProps {
	icon: IconProp;
	title: string;
}

const SearchBarTab: React.FC<SearchBarTabProps> = ({ icon, title }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<>
			<Divider
				orientation="vertical"
				flexItem
				css={css`
					margin-right: 20px;
				`}
			/>
			<FontAwesomeIcon
				icon={icon}
				color="#0B77BF"
				css={css`
					margin-left: ${isMobile ? '10px' : '0'};
					margin-top: ${isMobile ? '10px' : '0'};
				`}
			/>
			<InputBase
				placeholder={title}
				multiline={false}
				css={css`
					color: ${theme.palette.secondary.contrastText};
					padding-left: 0.5rem;
					padding-right: 0.5rem;
					text-overflow: ellipsis;
					max-width: 250px;
					font-weight: 500;
				`}
			/>
		</>
	);
};

export default SearchBarTab;
