import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import InfoAlert from 'src/components/app/InfoAlert';

const AboutUsCompany: React.FC = () => {
	const { register } = useForm();

	return (
		<>
			<InfoAlert />
			{/* TODO: Fill defaultValue with BE */}
			<form>
				<TextField
					{...register('company')}
					variant="outlined"
					margin="normal"
					label="Firmenname"
					defaultValue="BMW Group GmbH"
					fullWidth
				/>
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
				<Typography
					variant="h6"
					css={css`
						margin-top: 5px;
						font-weight: 500;
					`}
				>
					Adresse:
				</Typography>
				<TextField
					{...register('street1')}
					variant="outlined"
					margin="normal"
					label="Straße"
					defaultValue="Münchnerstr."
					fullWidth
				/>
				<TextField
					{...register('street2')}
					variant="outlined"
					margin="normal"
					label="zusätzliche Straße"
					defaultValue=""
					fullWidth
				/>
				<TextField
					{...register('zip')}
					variant="outlined"
					margin="normal"
					label="PLZ"
					defaultValue="84957"
					fullWidth
				/>
				<TextField
					{...register('city')}
					variant="outlined"
					margin="normal"
					label="Stadt"
					defaultValue="München"
					fullWidth
				/>
				<TextField
					{...register('country')}
					variant="outlined"
					margin="normal"
					label="Land"
					defaultValue="Deutschland"
					fullWidth
				/>
				<TextField
					{...register('state')}
					variant="outlined"
					margin="normal"
					label="Staat"
					defaultValue=""
					fullWidth
				/>
			</form>
		</>
	);
};

export default AboutUsCompany;
