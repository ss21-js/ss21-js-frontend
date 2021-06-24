import { css } from '@emotion/react';
import { faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Stack from '@material-ui/core/Stack';
import styled from '@material-ui/core/styles/styled';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import CompanyLogo from 'components/company/CompanyLogo';
import Center from 'components/layout/Center';
import React from 'react';
import { useRecoilValue } from 'recoil';
import jobByIdQuery from 'store/jobs/jobByIdQuerty';
import InfoContainerGroup from '../app/InfoContainerGroup';
import StyledIconButton from '../app/StyledIconButton';
import RoundedBox from '../RoundedBox';
import UnorderedList from '../UnorderedList';

const Header = styled('div')`
	position: relative;
	width: 100%;
	height: 256px;
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
`;

const ButtonRow = styled('div')`
	display: flex;
	justify-content: flex-end;
	margin: ${(props) => props.theme.spacing(2)};
`;

const Root = styled(RoundedBox)`
	height: 100%;
`;

const JobDetailsCardSkeleton: React.FC = () => {
	// TODO: Skeleton

	return (
		<Root>
			<Center>Loading...</Center>
		</Root>
	);
};

export interface JobDetailsCardProps {
	jobId: string;
	handleClose?: () => void;
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ jobId, handleClose }) => {
	const theme = useTheme();

	const job = useRecoilValue(jobByIdQuery(jobId));

	const handleSave = () => {
		//
	};

	const handleShare = () => {
		//
	};

	if (job === null) {
		return <Root>Job nicht gefunden.</Root>;
	}

	return (
		<Root>
			<Header>
				<HeaderImage src={job.headerImageUrl} />
				<CompanyLogoContainer>
					<CompanyLogo src={job.publisher.companyProfileImageUrl} />
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
			<ButtonRow>
				<StyledIconButton icon={faHeart} onClick={handleSave} />
				<Box width={16} />
				<StyledIconButton icon={faShareSquare} onClick={handleShare} />
			</ButtonRow>
			<Box padding={4}>
				<Typography variant="h4" component="h3" flexGrow={1}>
					{job.jobName}
				</Typography>
				<Stack direction="row" alignItems="baseline" marginBottom={3} flexWrap="wrap">
					<Typography variant="h6" color={theme.palette.primary.main}>
						{job.publisher.name}
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
							content: job.workBasis === 1 ? 'Teilzeit' : 'Vollzeit',
						},
						{
							title: 'Arbeitsbereich',
							content: job.workArea,
						},
					]}
				/>
				<Typography variant="h5" component="h4" gutterBottom>
					Overview
				</Typography>
				<Typography>{job.jobDescription}</Typography>
				<Typography variant="h5" component="h4" gutterBottom marginTop={2}>
					Qualifications
				</Typography>
				<UnorderedList>
					{job.jobQualifications.map((qualification, i) => (
						<Typography key={i} variant="body1" component="li" marginY={1}>
							{qualification}
						</Typography>
					))}
				</UnorderedList>
			</Box>
		</Root>
	);
};

const AsyncJobDetailsCard: React.FC<JobDetailsCardProps> = (props) => {
	return (
		<React.Suspense fallback={<JobDetailsCardSkeleton />}>
			<JobDetailsCard {...props} />
		</React.Suspense>
	);
};

export default AsyncJobDetailsCard;
