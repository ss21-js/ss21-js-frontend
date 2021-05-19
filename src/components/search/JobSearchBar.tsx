import { css } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign, faMapMarkerAlt, faSearch, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { experimentalStyled as styled, Theme, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import StyledButton from 'src/components/StyledButton';

interface TabProps {
	icon: IconProp;
	title: string;
}

const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const TabContainer = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-grow: 1;
	margin: 0 ${(props) => props.theme.spacing(2)};

	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		width: 100%;
		padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
	}
`;

const Tab: React.FC<TabProps> = ({ icon, title }) => {
	const theme = useTheme();

	return (
		<TabContainer>
			<Box display="flex" justifyContent="center" width="16px">
				<FontAwesomeIcon icon={icon} color={theme.palette.primary.main} />
			</Box>
			<InputBase
				placeholder={title}
				multiline={false}
				css={css`
					display: contents;
					color: ${theme.palette.secondary.contrastText};
					text-overflow: ellipsis;
					max-width: 250px;
					font-weight: 500;
					flex: 1 0 100%;
					& > input {
						margin: 0 ${theme.spacing(1)};
					}
				`}
			/>
		</TabContainer>
	);
};

const SearchContainer = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: ${(props) => props.theme.palette.background.paper};
	border-radius: ${(props) => props.theme.shape.borderRadius};
	box-shadow: 0 0px 0.8px rgba(0, 0, 0, 0.02), 0 0px 2px rgba(0, 0, 0, 0.025), 0 0px 3.8px rgba(0, 0, 0, 0.028),
		0 0px 6.7px rgba(0, 0, 0, 0.03), 0 0px 12.5px rgba(0, 0, 0, 0.033), 0 0px 30px rgba(0, 0, 0, 0.04);

	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		flex-direction: column;
	}
`;

const SearchFieldContainer = styled('div')`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	margin: 0 ${(props) => props.theme.spacing(2)};

	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		width: 100%;
		padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
	}
`;

const SearchButtonContainer = styled('div')`
	display: flex;
	justify-content: flex-end;

	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		width: 100%;
	}
`;

const SearchButton = styled(StyledButton)`
	height: 3.85rem;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;

	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		height: 3rem;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		width: 100%;
		border-bottom-left-radius: ${(props) => props.theme.shape.borderRadius};
	}
`;

export interface JobSearchBarProps {
	onClick: () => void;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ onClick }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(mobileBreakpoint));

	return (
		<SearchContainer>
			<SearchFieldContainer>
				<FontAwesomeIcon icon={faSearch} color="#0B77BF" />
				<Autocomplete
					multiple
					id="search"
					options={[]}
					defaultValue={[]}
					limitTags={1}
					freeSolo
					color="primary"
					css={css`
						flex: 1 1 100%;
					`}
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
			</SearchFieldContainer>
			<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
			<Tab icon={faMapMarkerAlt} title={'Stadt'} />
			<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
			<Tab icon={faSuitcase} title={'Job Type'} />
			<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
			<Tab icon={faDollarSign} title={'Budget'} />
			<SearchButtonContainer>
				<SearchButton onClick={onClick}>Job suchen</SearchButton>
			</SearchButtonContainer>
		</SearchContainer>
	);
};

export default JobSearchBar;
