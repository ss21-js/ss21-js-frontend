import { css } from '@emotion/react';
import { faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Stack from '@material-ui/core/Stack';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Job from 'src/model/job';
import InfoContainerGroup from '../app/InfoContainerGroup';
import StyledIconButton from '../app/StyledIconButton';
import RoundedBox from '../RoundedBox';
import UnorderedList from '../UnorderedList';

export interface JobDetailsCardProps {
	job: Job;
	handleClose?: () => void;
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

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ job, handleClose }) => {
	const theme = useTheme();

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
				{handleClose && (
					<ButtonBase
						color="secondary"
						onClick={handleClose}
						css={css`
							position: absolute;
							top: 32px;
							left: 32px;
							padding: 12px;
							border-radius: 50%;
							background-color: ${theme.palette.background.paper};
							box-shadow: 0 0px 2.2px rgba(0, 0, 0, 0.02), 0 0px 5.3px rgba(0, 0, 0, 0.028),
								0 0px 10px rgba(0, 0, 0, 0.035), 0 0px 17.9px rgba(0, 0, 0, 0.042),
								0 0px 33.4px rgba(0, 0, 0, 0.05), 0 0px 80px rgba(0, 0, 0, 0.07);
						`}
					>
						<FontAwesomeIcon icon={faArrowLeft} size="2x" color={theme.palette.primary.main} />
					</ButtonBase>
				)}
			</Header>
			<Box padding={4}>
				<Stack direction="row" marginBottom={1}>
					<Typography variant="h4" component="h3" flexGrow={1}>
						{job.title}
					</Typography>
					<StyledIconButton icon={faHeart} onClick={handleSave} />
					<Box width={16} />
					<StyledIconButton icon={faShareSquare} onClick={handleShare} />
				</Stack>
				<Stack direction="row" alignItems="baseline" marginBottom={3}>
					<Typography variant="h6" color={theme.palette.primary.main}>
						Dropbox
					</Typography>
					<Typography variant="body1" marginX={1}>
						•
					</Typography>
					<Typography variant="body1">San Francisco, CA.</Typography>
					<Box flexGrow={1} />
					<Typography variant="body1">Posted 8 days ago</Typography>
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
				<Typography variant="h5" component="h4" gutterBottom>
					Overview
				</Typography>
				<Typography>{job.description}</Typography>
				<Typography variant="h5" component="h4" gutterBottom marginTop={2}>
					Qualifications
				</Typography>
				<UnorderedList>
					{job.qualifications.map((qualification, i) => (
						<Typography key={i} variant="body1" component="li" marginY={1}>
							{qualification}
						</Typography>
					))}
				</UnorderedList>
			</Box>
		</RoundedBox>
	);
};

export default JobDetailsCard;
