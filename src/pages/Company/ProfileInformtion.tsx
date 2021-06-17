import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import InfoAlert from 'src/components/app/InfoAlert';
import Center from 'src/components/layout/Center';

const Container = styled(Center)`
	display: grid;
	height: 100%;
`;

const ProfileInformtion: React.FC = () => {
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
						Profil Daten:
					</Typography>
					<TextField
						{...register('company')}
						variant="outlined"
						margin="normal"
						label="Firmenname"
						defaultValue="BMW Group GmbH"
						fullWidth
					/>
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
		</Container>
	);
};

export default ProfileInformtion;
