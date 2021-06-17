import { css } from '@emotion/react';
import { Typography, useMediaQuery } from '@material-ui/core';
import { experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InfoAlert from 'components/app/InfoAlert';
import Center from 'components/layout/Center';
import React from 'react';
import { useForm } from 'react-hook-form';

const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const Container = styled(Center)`
	display: grid;
	height: 435px;
	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		padding: 0 1rem 0 1rem;
	}
`;

const AdditionalDataCompany: React.FC = () => {
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
					`}
				>
					<Typography
						variant="h6"
						css={css`
							margin-top: 5px;
							font-weight: 500;
						`}
					>
						zusätzliche Daten:
					</Typography>
					<TextField
						{...register('homepage')}
						variant="outlined"
						margin="normal"
						label="Webseite"
						defaultValue="www.bmw-group.de"
						fullWidth
					/>
					<TextField
						{...register('email')}
						variant="outlined"
						margin="normal"
						label="E-Mailadresse"
						defaultValue="info@bmw-group.de"
						fullWidth
					/>
					<TextField
						{...register('location')}
						variant="outlined"
						margin="normal"
						label="Standort"
						defaultValue="München"
						fullWidth
					/>
				</form>
			</>
		</Container>
	);
};

export default AdditionalDataCompany;
