import { faEnvelope, faGlobe, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, useMediaQuery } from '@material-ui/core';
import styled from '@material-ui/core/styles/styled';
import Typography from '@material-ui/core/Typography';
import { Company } from 'js-api-client';
import React from 'react';
import CompanyImages from './CompanyImages';

const InfoRow = styled('div')`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: 64px;
	padding: ${(props) => props.theme.spacing(1)} 0;

	${(props) => props.theme.breakpoints.down('sm')} {
		flex-direction: column;
		height: auto;
		align-items: flex-start;
	}
`;

const InfoSpacer = styled('div')`
	width: ${(props) => props.theme.spacing(3)};
	height: ${(props) => props.theme.spacing(1)};
`;
interface InfoContainerProps {
	company: Partial<Company>;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ company }) => {
	return (
		<InfoRow>
			<Typography component="p" variant="body1" gutterBottom>
				<FontAwesomeIcon icon={faGlobe} size="lg" />
				&nbsp;{company.homepage}
			</Typography>
			<InfoSpacer />
			<Typography component="p" variant="body1">
				<FontAwesomeIcon icon={faEnvelope} size="lg" />
				&nbsp;{company.email}
			</Typography>
			<InfoSpacer />
			<Typography component="p" variant="body1" gutterBottom>
				<FontAwesomeIcon icon={faMapPin} size="lg" />
				&nbsp;{company.address?.street1}
				{company.address?.street2 ? ` ${company.address?.street2}` : ''}, {company.address?.zip}{' '}
				{company.address?.city}
			</Typography>
		</InfoRow>
	);
};

export interface OnboardingCompanyProfileProps {
	company: Partial<Company>;
	headerImageChanged: (file: File, url: string) => void;
	profileImageChanged: (file: File, url: string) => void;
}

const OnboardingCompanyProfile: React.FC<OnboardingCompanyProfileProps> = ({
	company,
	headerImageChanged,
	profileImageChanged,
}) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<div>
			<CompanyImages
				headerImageUrl={company.companyHeaderImageUrl}
				headerImageChanged={headerImageChanged}
				profileImageUrl={company.companyProfileImageUrl}
				profileImageChanged={profileImageChanged}
				infoComponent={!isMobile && <InfoContainer company={company} />}
				disableFirebase
			/>
			{isMobile && <InfoContainer company={company} />}
			<Typography component="h2" variant="h5" gutterBottom>
				{company.name}
			</Typography>
			<Typography component="p" variant="body1" gutterBottom>
				{company.companyInfo}
			</Typography>
		</div>
	);
};

export default OnboardingCompanyProfile;
