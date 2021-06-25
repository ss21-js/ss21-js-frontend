import { faEnvelope, faGlobe, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createTheme';
import styled from '@material-ui/core/styles/styled';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useToast from 'common/useToast';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from 'index';
import { Company } from 'js-api-client';
import OpenJobOffers from 'pages/Company/OpenJobOffers';
import React from 'react';
import useUpdateCompany from 'store/user/useUpdateCompany';
import ProfileImages from '../profile/ProfileHeaderImages';
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
			{company.homepage && (
				<>
					<Typography color={theme.palette.text.primary} component="p" variant="body1" gutterBottom>
						<FontAwesomeIcon icon={faGlobe} size="lg" />
						&nbsp;&nbsp;{company.homepage}
					</Typography>
					<InfoSpacer />
				</>
			)}
			<Typography color={theme.palette.text.primary} component="p" variant="body1">
				<FontAwesomeIcon icon={faEnvelope} size="lg" />
				&nbsp;&nbsp;{company.email}
			</Typography>
			<InfoSpacer />
			<Typography color={theme.palette.text.primary} component="p" variant="body1" gutterBottom>
				<FontAwesomeIcon icon={faMapPin} size="lg" />
				&nbsp;&nbsp;{company.address?.street1}
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

	const toast = useToast();
	const updateCompany = useUpdateCompany();

	const uploadFileAndUpdateUrl = async (file: File, key: keyof Company) => {
		const refString = `images/${company.id}/${file.name}`;
		const fileRef = ref(firebaseStorage, refString);
		await uploadBytes(fileRef, file);
		return updateCompany!({ ...company, [key]: refString });
	};

	const headerImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'companyHeaderImageUrl'));
	};

	const profileImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'companyProfileImageUrl'));
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
				<ProfileImages
					headerImageUrl={company.companyHeaderImageUrl}
					headerImageChanged={editable ? headerImageChanged : undefined}
					profileImageUrl={company.companyProfileImageUrl}
					profileImageChanged={editable ? profileImageChanged : undefined}
					infoComponent={!isMobile && <InfoContainer company={company} />}
				/>
				{editable && (
					<HeaderActions>
						<StyledButton onClick={handleOpenEdit}>Profil bearbeiten</StyledButton>
					</HeaderActions>
				)}
			</Header>
			<Grid
				container
				direction="column"
				padding={{
					xs: 2,
					md: 4,
				}}
				spacing={2}
				alignItems={'center'}
			>
				<Grid item md={6} xs={12} width={'60%'}>
					<RoundedBox padding={4}>
						{isMobile && <InfoContainer company={company} />}
						<Typography component="h2" variant="h5" gutterBottom>
							{company.name}
						</Typography>
						<Typography component="p" variant="body1" gutterBottom>
							{company.companyInfo}
						</Typography>
					</RoundedBox>
				</Grid>
				<Grid item width={'60%'}>
					<OpenJobOffers jobs={[]} />
				</Grid>
			</Grid>
			<EditCompanyDialog open={editOpen} handleClose={handleCloseEdit} />
		</>
	);
};

export default CompanyProfile;
