import { faEnvelope, faGlobe, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, useTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import { Company } from 'js-api-client';
import React from 'react';
import CompanyImages from './CompanyImages';
import EditCompanyDialog from './EditCompanyDialog';

const Header = styled('div')`
	position: relative;
	width: 100%;
	color: white;
`;

const InfoRow = styled('div')`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: 64px;
	padding: ${(props) => props.theme.spacing(2)} 0;

	${(props) => props.theme.breakpoints.down('sm')} {
		flex-direction: column;
		height: auto;
		align-items: flex-start;
		padding-top: 0;
	}
`;

const InfoSpacer = styled('div')`
	width: ${(props) => props.theme.spacing(3)};
	height: ${(props) => props.theme.spacing(1)};
`;

const HeaderActions = styled('div')`
	position: absolute;
	right: ${(props) => props.theme.spacing(2)};
	bottom: ${(props) => props.theme.spacing(2)};
`;
interface InfoContainerProps {
	company: Partial<Company>;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ company }) => {
	const theme = useTheme();

	return (
		<InfoRow>
			<Typography color={theme.palette.text.primary} component="p" variant="body1" gutterBottom>
				<FontAwesomeIcon icon={faGlobe} size="lg" />
				&nbsp;{company.homepage}
			</Typography>
			<InfoSpacer />
			<Typography color={theme.palette.text.primary} component="p" variant="body1">
				<FontAwesomeIcon icon={faEnvelope} size="lg" />
				&nbsp;{company.email}
			</Typography>
			<InfoSpacer />
			<Typography color={theme.palette.text.primary} component="p" variant="body1" gutterBottom>
				<FontAwesomeIcon icon={faMapPin} size="lg" />
				&nbsp;{company.address?.street1}
				{company.address?.street2 ? ` ${company.address?.street2}` : ''}, {company.address?.zip}{' '}
				{company.address?.city}
			</Typography>
		</InfoRow>
	);
};

export interface CompanyProfileProps {
	company: Company;
	editable?: boolean;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, editable }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [editOpen, setEditOpen] = React.useState(false);

	const headerImageChanged = (file: File) => {
		// Upload and update
		console.log(file);
	};

	const profileImageChanged = (file: File) => {
		// Upload and update
		console.log(file);
	};

	const handleOpenEdit = () => {
		setEditOpen(true);
	};

	const handleCloseEdit = () => {
		setEditOpen(false);
	};

	return (
		<>
			<Header>
				<CompanyImages
					headerImageUrl={company.companyHeaderImageUrl}
					headerImageChanged={headerImageChanged}
					profileImageUrl={company.companyProfileImageUrl}
					profileImageChanged={profileImageChanged}
					infoComponent={!isMobile && <InfoContainer company={company} />}
					largeLogo={!isMobile}
				/>
				{editable && (
					<HeaderActions>
						<StyledButton onClick={handleOpenEdit}>Profil bearbeiten</StyledButton>
					</HeaderActions>
				)}
			</Header>
			<Container maxWidth="lg">
				<Grid
					container
					padding={{
						xs: 2,
						md: 4,
					}}
					spacing={2}
				>
					<Grid item xs={12}>
						<RoundedBox padding={3}>
							{isMobile && <InfoContainer company={company} />}
							<Typography component="h2" variant="h5" gutterBottom>
								{company.name}
							</Typography>
							<Typography component="p" variant="body1" gutterBottom>
								{company.companyInfo}
							</Typography>
						</RoundedBox>
					</Grid>
				</Grid>
			</Container>
			<EditCompanyDialog open={editOpen} handleClose={handleCloseEdit} />
		</>
	);
};

export default CompanyProfile;
