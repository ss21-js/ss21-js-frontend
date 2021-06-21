import { css } from '@emotion/react';
import { TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import InfoAlert from 'components/app/InfoAlert';
import Center from 'components/layout/Center';
import React from 'react';
import { useForm } from 'react-hook-form';

const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const Container = styled(Center)`
	display: grid;
	height: 100%;
	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		padding: 0 1rem 0 1rem;
	}
`;

const StepOneStudent: React.FC = () => {
	const { register } = useForm();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
	return (
		<Container>
			<>
				<InfoAlert />
				{/* TODO: Fill defaultValue with BE */}
				<form
					css={css`
						width: ${isMobile ? 'auto' : '64rem'};
						padding: ${isMobile ? '0 1rem 0 1rem' : '0'};
					`}
				>
					<Typography
						variant="h6"
						css={css`
							margin-top: 5px;
							font-weight: 500;
						`}
					>
						Profil Daten:
					</Typography>
					<TextField
						{...register('firstname')}
						variant="outlined"
						margin="normal"
						label="Vorname"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('lastname')}
						variant="outlined"
						margin="normal"
						label="Nachname"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('street1')}
						variant="outlined"
						margin="normal"
						label="Straße"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('street2')}
						variant="outlined"
						margin="normal"
						label="Straße"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('zip')}
						variant="outlined"
						margin="normal"
						label="PLZ"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('city')}
						variant="outlined"
						margin="normal"
						label="Stadt"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('country')}
						variant="outlined"
						margin="normal"
						label="Land"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('state')}
						variant="outlined"
						margin="normal"
						label="Bundesland"
						defaultValue=""
						fullWidth
					/>
				</form>
			</>
		</Container>
	);
};

export default StepOneStudent;
