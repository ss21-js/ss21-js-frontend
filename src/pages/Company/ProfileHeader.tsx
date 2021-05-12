import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { faIdBadge, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import Picture from 'src/assets/HeaderPicture.jpeg';
import RoundedImage from 'src/components/RoundedImage';
import { Adress } from 'src/model/adress';

const GirdWrapper = styled(Grid)`
	background-color: whitesmoke;
	@media (min-width: 420px) {
        display: block;
    }
`;

const Image = styled(RoundedImage)`
	margin-left: 300px;
	@media (max-width: 420px) {
        margin-left: 70px;
    }
	margin-right: 100px;
	border-radius: 4.6rem;
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
	const isMobile = useMediaQuery(() => theme.breakpoints.down('md'));

	return (
		<GirdWrapper container justifyContent="center">
			<Grid
				item
				xs={12}
				padding={5}
				css={css`
					background-color: ${theme.palette.primary.main};
					display: ${isMobile ? 'block' : 'flex'};
				`}
			>
				<div>
				<Image src={Picture} width="150px" height="150px" />
				</div>
				<div
					css={css`
					text-align: ${isMobile ? '-webkit-center' : ''};
					align-self: ${isMobile ? '' : 'center'};
					`}
				>
					<Typography
						variant="h4"
						component="h1"
						css={css`
							color: ${theme.palette.primary.contrastText};
							text-shadow: 0 0 2px grey;
						`}
					>
						{firstName} {lastName} {companyName}
					</Typography>
					<Typography
						variant="subtitle1"
						component="h1"
						css={css`
							color: ${theme.palette.primary.contrastText};
							text-shadow: 0 0 2px grey;
							padding-top: 2rem;
						`}
					>
						<FontAwesomeIcon
							icon={faIdBadge}
							css={css`
								margin-right: 10px;
							`}
						/>
						{type}
					</Typography>
					<Typography variant="subtitle1" component="h1">
						<FontAwesomeIcon
							icon={faMapMarkerAlt}
							css={css`
								margin-right: 10px;
								text-shadow: 0 0 2px grey;
								color: ${theme.palette.primary.contrastText};
							`}
						/>
						{adress}
					</Typography>
				</div>
			</Grid>
		</GirdWrapper>
	);
};

export default ProfilHeader;
