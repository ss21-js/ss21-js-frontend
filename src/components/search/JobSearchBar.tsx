import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign, faMapMarkerAlt, faSearch, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/core/Autocomplete';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import StyledButton from 'src/components/StyledButton';

interface SearchBarTabProps {
	icon: IconProp;
	title: string;
}

const JobSearchBarTab: React.FC<SearchBarTabProps> = ({ icon, title }) => {
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

export interface JobSearchBarProps {
	onClick: () => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ onClick }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<div>
			<AppBar
				position="static"
				css={css`
					background-color: white;
					box-shadow: 1px 1px 3px lightgrey;
					border-radius: 0.6rem;
					width: ${isMobile && '20rem'};
				`}
			>
				<Toolbar
					css={css`
						display: ${isMobile ? 'contents' : 'flex'};
					`}
				>
					<FontAwesomeIcon
						icon={faSearch}
						color="#0B77BF"
						css={css`
							margin-left: ${isMobile ? '10px' : '0'};
							margin-top: ${isMobile ? '10px' : '0'};
						`}
					/>
					<Autocomplete
						multiple
						id="search"
						options={[]}
						defaultValue={[]}
						limitTags={1}
						freeSolo
						color="primary"
						renderInput={(params) => (
							<TextField
								{...params}
								variant="standard"
								placeholder="Suchen ..."
								css={css`
									padding-left: 8px;
									padding-right: 10px;
									min-width: 14rem;
								`}
							/>
						)}
					/>
					<JobSearchBarTab icon={faMapMarkerAlt} title={'Stadt'} />
					<JobSearchBarTab icon={faSuitcase} title={'Job Type'} />
					<JobSearchBarTab icon={faDollarSign} title={'Budget'} />
					<StyledButton
						onClick={onClick}
						css={css`
							height: ${isMobile ? '3rem' : '3.85rem'};
						`}
					>
						Job suchen
					</StyledButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default JobSearchBar;
