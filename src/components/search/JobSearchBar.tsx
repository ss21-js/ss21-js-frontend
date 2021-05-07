import { css } from '@emotion/react';
import { faDollarSign, faMapMarkerAlt, faSearch, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Autocomplete from '@material-ui/core/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import JobSearchBarTab from 'src/components/search/JobSearchBarTab';
import StyledButton from 'src/components/StyledButton';

export interface SearchAppBarProps {
	onClick: () => void;
}

const useStyles = makeStyles(() => ({
	root: {
		paddingRight: 0,
	},
}));

const SearchAppBar: React.FC<SearchAppBarProps> = ({ onClick }) => {
	const classes = useStyles();

	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<div>
			<AppBar
				position="static"
				css={css`
					background-color: white;
					box-shadow: 1px 1px 10px lightgrey;
					border-radius: 0.6rem;
					width: ${isMobile && '20rem'};
				`}
			>
				<Toolbar
					className={classes.root}
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
					<JobSearchBarTab icon={faDollarSign} title={'Buget'} />
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
export default SearchAppBar;
