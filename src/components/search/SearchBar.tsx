import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@material-ui/core/styles/styled';
import StyledButton from 'components/StyledButton';
import React from 'react';
import { SearchJobDto } from 'js-api-client';
import useMaterialRegister from 'common/useMaterialRegister';
import { Control } from 'react-hook-form';
import { InputBase } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { omit } from 'lodash';
import FormHelperText from '@material-ui/core/FormHelperText';
import RoundedBox from 'components/RoundedBox';

const SearchContainer = styled(RoundedBox)`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: ${(props) => props.theme.palette.background.paper};
	border-radius: ${(props) => props.theme.shape.borderRadius};
	box-shadow: 0 0px 0.8px rgba(0, 0, 0, 0.02), 0 0px 2px rgba(0, 0, 0, 0.025), 0 0px 3.8px rgba(0, 0, 0, 0.028),
		0 0px 6.7px rgba(0, 0, 0, 0.03), 0 0px 12.5px rgba(0, 0, 0, 0.033), 0 0px 30px rgba(0, 0, 0, 0.04);

	${(props) => props.theme.breakpoints.down('md')} {
		flex-direction: column;
	}
`;

const SearchFieldContainer = styled('div')`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	margin: 0 ${(props) => props.theme.spacing(2)};

	${(props) => props.theme.breakpoints.down('md')} {
		width: 100%;
		padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
	}
`;

const SearchButtonContainer = styled('div')`
	display: flex;
	justify-content: flex-end;

	${(props) => props.theme.breakpoints.down('md')} {
		width: 100%;
	}
`;

const SearchButton = styled(StyledButton)`
	height: 3.85rem;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;

	${(props) => props.theme.breakpoints.down('md')} {
		height: 3rem;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		width: 100%;
		border-bottom-left-radius: ${(props) => props.theme.shape.borderRadius};
	}
`;

export interface JobSearchBarProps {
	control: Control<SearchJobDto>;
	isDirty: boolean;
}

const SearchBar: React.FC<JobSearchBarProps> = ({ control, isDirty }) => {
	const search = useMaterialRegister(control, 'searchString');

	return (
		<SearchContainer>
			<SearchFieldContainer>
				<FontAwesomeIcon icon={faSearch} color="#0B77BF" />
				<FormControl fullWidth>
					<InputBase
						{...omit(search, 'helperText')}
						sx={{ ml: 1, flex: 1 }}
						placeholder="Suchen ..."
						inputProps={{ 'aria-label': 'suchen' }}
					/>
					{search.helperText && <FormHelperText>{search.helperText}</FormHelperText>}
				</FormControl>
			</SearchFieldContainer>
			<SearchButtonContainer>
				<SearchButton disabled={!isDirty} type={'submit'}>
					Job suchen
				</SearchButton>
			</SearchButtonContainer>
		</SearchContainer>
	);
};

export default SearchBar;
