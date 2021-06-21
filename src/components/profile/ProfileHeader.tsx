import { css } from '@emotion/react';
import { faIdBadge, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Address } from 'js-api-client';
import CompanyProfilePage from 'pages/Company/CompanyProfilePage';
import React from 'react';

export interface ProfileHeaderProps {
	firstName: string;
	lastName: string;
	companyName: string;
	type: string;
	address: Address[];
}

const UiTypography = styled(Typography)`
	color: ${(props) => props.theme.palette.primary.contrastText};
	text-shadow: 0 0 2px grey;
`;

const UiFontAwesomeIcon = styled(FontAwesomeIcon)`
	margin-right: 10px;
`;

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ firstName, lastName, companyName, type, address }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(() => theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			justifyContent="center"
			css={css`
				background-color: ${isMobile ? `${theme.palette.primary.main}` : null};
			`}
		>
			<Grid
				item
				xs={12}
				padding={5}
				css={css`
					background-color: ${theme.palette.primary.main};
					display: ${isMobile ? 'contents' : 'flex'};
					justify-content: center;
				`}
			>
				{/* <ProfilImage /> */}
				<div
					css={css`
						text-align: ${isMobile ? '-webkit-center' : ''};
						align-self: ${isMobile ? '' : 'center'};
						margin-top: ${isMobile ? '20px' : '0'};
						margin-bottom: ${isMobile ? '20px' : '0'};
					`}
				>
					<UiTypography variant="h4">
						{firstName} {lastName} {companyName}
					</UiTypography>
					<Typography
						variant="subtitle1"
						css={css`
							color: ${theme.palette.primary.contrastText};
							text-shadow: 0 0 2px grey;
							padding-top: 2rem;
						`}
					>
						<UiFontAwesomeIcon icon={faIdBadge} />
						{type}
					</Typography>
					<UiTypography variant="subtitle1">
						<UiFontAwesomeIcon icon={faMapMarkerAlt} />
						{address}
					</UiTypography>
				</div>
			</Grid>
			<CompanyProfilePage />
		</Grid>
	);
};

export default ProfileHeader;
