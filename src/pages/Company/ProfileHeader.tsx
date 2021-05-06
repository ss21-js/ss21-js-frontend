import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Picture from 'src/assets/HeaderPicture.jpeg';
import RoundedImage from 'src/components/RoundedImage';
import { Adress } from 'src/model/adress';

const Image = styled(RoundedImage)`
	margin-left: 300px;
	margin-right: 100px;
`;

export interface ProfilHeaderProps {
	firstName: string;
	lastName: string;
	companyName: string;
	type: string;
	adress: Adress[];
}

const ProfilHeader: React.FC<ProfilHeaderProps> = ({ firstName, lastName, companyName, type, adress }) => {
	const theme = useTheme();

	return (
		<Box
			css={css`
				display: flex;
				height: 40%;
				background-color: ${theme.palette.primary.main};
				align-items: center;
			`}
		>
			<Image src={Picture} width="100px" height="100px" />
			<div>
				<Typography variant="h2" component="h1">
					{firstName} {lastName} {companyName}
				</Typography>
				<Typography variant="subtitle1" component="h1">
					{type}
				</Typography>
				<Typography variant="subtitle1" component="h1">
					{adress}
				</Typography>
			</div>
		</Box>
	);
};

export default ProfilHeader;
