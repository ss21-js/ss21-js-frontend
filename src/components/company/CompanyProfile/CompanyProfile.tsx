import ProfileImages from 'components/profile/ProfileHeaderImages';
import StyledButton from 'components/StyledButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import RoundedBox from 'components/RoundedBox';
import Typography from '@material-ui/core/Typography';
import CompanyJob from 'components/company/CompanyJob';
import React from 'react';
import { Company, JobWithCompany } from 'js-api-client';
import styled from '@material-ui/core/styles/styled';
import CompanyProfileInfoContainer from 'components/company/CompanyProfile/CompanyProfileInfoContainer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles/createTheme';

const Header = styled('div')`
	position: relative;
	width: 100%;
	color: white;
`;

const HeaderActions = styled('div')`
	position: absolute;
	right: ${(props) => props.theme.spacing(2)};
	bottom: ${(props) => props.theme.spacing(2)};
`;

interface CompanyProfileContentProps {
	company: Company;
	handleOpenEdit?: () => void;
	headerImageChanged?: (file: File, url: string) => void;
	profileImageChanged?: (file: File, url: string) => void;
	jobs?: JobWithCompany[];
}

const CompanyProfile: React.FC<CompanyProfileContentProps> = ({
	company,
	handleOpenEdit,
	headerImageChanged,
	profileImageChanged,
	jobs,
}) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<>
			<Header>
				<ProfileImages
					headerImageUrl={company.companyHeaderImageUrl}
					headerImageChanged={headerImageChanged}
					profileImageUrl={company.companyProfileImageUrl}
					profileImageChanged={profileImageChanged}
					infoComponent={!isMobile && <CompanyProfileInfoContainer company={company} />}
				/>
				{handleOpenEdit && (
					<HeaderActions>
						<StyledButton onClick={handleOpenEdit}>Profil bearbeiten</StyledButton>
					</HeaderActions>
				)}
			</Header>
			<Container maxWidth="lg">
				<Grid
					container
					direction="column"
					padding={{
						xs: 2,
						md: 4,
					}}
					spacing={4}
				>
					<Grid item xs={12}>
						<RoundedBox padding={4}>
							{isMobile && <CompanyProfileInfoContainer company={company} />}
							<Typography component="h2" variant="h5" gutterBottom>
								{company.name}
							</Typography>
							<Typography component="p" variant="body1" gutterBottom>
								{company.companyInfo}
							</Typography>
						</RoundedBox>
					</Grid>
					{jobs &&
						jobs.map((job) => (
							<Grid key={job.id} item xs={12}>
								<CompanyJob job={job} students={[]} />
							</Grid>
						))}
					{/*<Grid item xs={12}>*/}
					{/*	<OpenJobOffers jobs={jobsWithCompany} />*/}
					{/*</Grid>*/}
				</Grid>
			</Container>
		</>
	);
};

export default CompanyProfile;
