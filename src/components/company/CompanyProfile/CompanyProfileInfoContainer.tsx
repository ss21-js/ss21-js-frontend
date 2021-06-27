import { Company } from 'js-api-client';
import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faMapPin } from '@fortawesome/free-solid-svg-icons';
import styled from '@material-ui/core/styles/styled';

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

interface CompanyInfoContainerProps {
	company: Partial<Company>;
}

const CompanyProfileInfoContainer: React.FC<CompanyInfoContainerProps> = ({ company }) => {
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

export default CompanyProfileInfoContainer;
