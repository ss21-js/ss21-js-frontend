import { css } from '@emotion/react';
import { TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import InfoAlert from 'src/components/app/InfoAlert';
import Center from 'src/components/layout/Center';

const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const Container = styled(Center)`
	display: grid;
	height: 100%;
	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		padding: 0 1rem 0 1rem;
	}
`;

const StepTwoStudent: React.FC = () => {
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
						}
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
						{...register('githubUsername')}
						variant="outlined"
						margin="normal"
						label="Github Username"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('university')}
						variant="outlined"
						margin="normal"
						label="Universität"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('homepage')}
						variant="outlined"
						margin="normal"
						label="Homepage"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('semester')}
						variant="outlined"
						margin="normal"
						label="Semester"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('skills')}
						variant="outlined"
						margin="normal"
						label="Skills"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('yearsOfExperience')}
						variant="outlined"
						margin="normal"
						label="Erfahrung"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('workArea')}
						variant="outlined"
						margin="normal"
						label="Fähigkeit"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('workBasis')}
						variant="outlined"
						margin="normal"
						label="Beschäftigung"
						defaultValue=""
						fullWidth
					/>
					<TextField
						{...register('description')}
						variant="outlined"
						margin="normal"
						label="Beschreibung"
						defaultValue=""
						fullWidth
					/>
				</form>
			</>
		</Container>
	);
};

export default StepTwoStudent;
