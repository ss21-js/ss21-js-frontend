import { css } from '@emotion/react';
import { Alert, Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import React from 'react';
import Center from 'src/components/layout/Center';
import ProfilImage from '../profile/ProfilImage';

const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const Image = styled(ProfilImage)`
	margin-top: 0;
	margin-right: 70px;
	${(props) => props.theme.breakpoints.down(mobileBreakpoint)} {
		margin-right: 0;
	}
`;

const CenterContainer = styled(Center)`
	height: 22rem;
`;

const AlertText = styled(Alert)`
	width: max-content;
`;

const ProfileImageUpload: React.FC = () => {
	return (
		<>
			<Typography
				variant="h6"
				css={css`
					margin-left: 13rem;
					font-weight: 500;
				`}
			>
				Profilbild hochladen:
			</Typography>
			<Center>
				<AlertText severity="info"> Klicken Sie auf das Bild, um ein Profilbild hochzuladen!</AlertText>
			</Center>
			<CenterContainer>
				<Image />
			</CenterContainer>
		</>
	);
};

export default ProfileImageUpload;
