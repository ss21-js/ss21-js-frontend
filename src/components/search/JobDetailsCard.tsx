import { faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Job from 'src/model/job';
import InfoContainerGroup from '../app/InfoContainerGroup';
import StyledIconButton from '../app/StyledIconButton';
import RoundedBox from '../RoundedBox';

export interface JobDetailsCardProps {
	job: Job;
}

const Header = styled('div')`
	position: relative;
	width: 100%;
	height: 256px;
	margin-bottom: 48px;
`;

const HeaderImage = styled('img')`
	border-top-left-radius: ${(props) => props.theme.shape.borderRadius};
	border-top-right-radius: ${(props) => props.theme.shape.borderRadius};
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const CompanyLogoContainer = styled('div')`
	position: absolute;
	left: 6%;
	bottom: -64px;
	transform: translate(-50% -50%);
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 128px;
	height: 128px;
	padding: 8px;
`;

const CompanyLogo = styled('img')`
	width: 100%;
	height: 100%;
	border-radius: ${(props) => props.theme.shape.borderRadius};
`;

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ job }) => {
	const handleSave = () => {
		//
	};

	const handleShare = () => {
		//
	};

	return (
		<RoundedBox>
			<Header>
				<HeaderImage src={job.headerImageUrl} />
				<CompanyLogoContainer>
					<CompanyLogo src={job.companyLogoUrl} />
				</CompanyLogoContainer>
			</Header>
			<Box padding={4}>
				<Stack direction="row" marginBottom={3}>
					<Typography variant="h4" component="h3" flexGrow={1}>
						{job.title}
					</Typography>
					<StyledIconButton icon={faHeart} onClick={handleSave} />
					<Box width={16} />
					<StyledIconButton icon={faShareSquare} onClick={handleShare} />
				</Stack>
				<InfoContainerGroup
					marginBottom={3}
					items={[
						{
							title: 'Experience',
							content: job.experience,
						},
						{
							title: 'Work Level',
							content: job.workLevel,
						},
						{
							title: 'Employee Type',
							content: job.employeeType,
						},
						{
							title: 'Offer Salary',
							content: job.offerSalary,
						},
					]}
				/>
				<Typography variant="h5" component="h4">
					Overview
				</Typography>
				<Typography>{job.description}</Typography>
			</Box>
		</RoundedBox>
	);
};

export default JobDetailsCard;
