import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import InfoAlert from 'src/components/app/InfoAlert';
import Center from 'src/components/layout/Center';

const Container = styled(Center)`
	display: grid;
	height: 435px;
`;

const AdditionalDataCompany: React.FC = () => {
	const { register } = useForm();
	return (
		<Container>
			<>
				<InfoAlert />
				{/* TODO: Fill defaultValue with BE */}
				<form
					css={css`
						width: 64rem;
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
