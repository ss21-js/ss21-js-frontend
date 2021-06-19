import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import Typography from '@material-ui/core/Typography';
import StyledButton from 'components/StyledButton';
import { Company } from 'js-api-client';
import React from 'react';
import CompanyLogo from './CompanyLogo';
import EditCompanyDialog from './EditCompanyDialog';

const Header = styled('div')`
	position: relative;
	width: 100%;
	height: max(30vh, 250px);
	text-transform: uppercase;
	color: white;
`;

const HeaderImage = styled('img')`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const HeaderContent = styled('div')`
	display: flex;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const HeaderTextContainer = styled('div')`
	display: flex;
	flex-direction: column;
	margin-left: ${(props) => props.theme.spacing(3)};
`;

const HeaderActions = styled('div')`
	position: absolute;
	right: ${(props) => props.theme.spacing(2)};
	bottom: ${(props) => props.theme.spacing(2)};
`;

const HeaderText = styled(Typography)`
	text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
`;

export interface CompanyProfileProps {
	company: Company;
	editable?: boolean;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, editable }) => {
	const [editOpen, setEditOpen] = React.useState(false);

	const handleOpenEdit = () => {
		setEditOpen(true);
	};

	const handleCloseEdit = () => {
		setEditOpen(false);
	};

	return (
		<div>
			<Header>
				<HeaderImage
					src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
					alt="Unternehmensheader"
				/>
				<HeaderContent>
					<CompanyLogo src="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20" />
					<HeaderTextContainer>
						<HeaderText variant="h2">{company.name}</HeaderText>
						<HeaderText variant="h5" gutterBottom>
							<FontAwesomeIcon icon={faGlobe} size="lg" />
							&nbsp;{company.homepage}
						</HeaderText>
						<HeaderText variant="h5">
							<FontAwesomeIcon icon={faEnvelope} size="lg" />
							&nbsp;{company.email}
						</HeaderText>
					</HeaderTextContainer>
				</HeaderContent>
				{editable && (
					<HeaderActions>
						<StyledButton onClick={handleOpenEdit}>Profil bearbeiten</StyledButton>
					</HeaderActions>
				)}
			</Header>
			<Grid container margin={2} spacing={2}>
				<Grid item xs={8}>
					Old jobs
				</Grid>
			</Grid>
			<EditCompanyDialog open={editOpen} handleClose={handleCloseEdit} />
		</div>
	);
};

export default CompanyProfile;
