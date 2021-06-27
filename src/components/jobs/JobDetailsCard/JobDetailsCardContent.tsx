import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import ProfileHeaderImages from 'components/profile/ProfileHeaderImages';
import ButtonBase from '@material-ui/core/ButtonBase';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';
import StyledIconButton from 'components/app/StyledIconButton';
import { Link } from 'react-typesafe-routes';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import { format, formatRelative } from 'date-fns';
import InfoContainerGroup from 'components/app/InfoContainerGroup';
import WorkArea from 'models/workArea';
import UnorderedList from 'components/UnorderedList';
import { JobWithCompany } from 'js-api-client';
import styled from '@material-ui/core/styles/styled';
import JobDetailsCardRoot from 'components/jobs/JobDetailsCard/JobDetailsCardRoot';
import { de } from 'date-fns/locale';
import Grid from '@material-ui/core/Grid';
import TagBox from 'components/TagBox';
import JobSaveButton from 'components/jobs/JobDetailsCard/JobSaveButton';
import router from '../../../Router';
import StyledButton from 'components/StyledButton';
import Divider from '@material-ui/core/Divider';

const Header = styled('div')`
	position: relative;
	width: 100%;
	height: 256px;
`;

const ButtonRow = styled('div')`
	display: flex;
	justify-content: flex-end;
	margin: ${(props) => props.theme.spacing(2)};
	min-height: 40px;
`;

interface JobDetailsCardContentProps {
	job: JobWithCompany;
	disabledCompanyLink?: boolean;
	disableSave?: boolean;
	handleShare?: () => void;
	handleClose?: () => void;
	shrink?: boolean;
	handleRequest?: () => void;
	requested?: boolean;
}

const JobDetailsCardContent: React.FC<JobDetailsCardContentProps> = ({
	job,
	handleClose,
	handleShare,
	disableSave,
	disabledCompanyLink,
	shrink,
	handleRequest,
	requested,
}) => {
	const theme = useTheme();

	return (
		<JobDetailsCardRoot
			css={
				shrink &&
				css`
					height: auto;
					width: 100%;
				`
			}
		>
			<Header>
				<ProfileHeaderImages
					headerImageUrl={job.headerImageUrl}
					profileImageUrl={job.publisher.companyProfileImageUrl}
				/>
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
				{!disableSave && (
					<>
						<JobSaveButton jobId={job.id} />
						<Box width={16} />
					</>
				)}
				{handleShare && (
					<Tooltip title={'Permalink kopieren'}>
						<span>
							<StyledIconButton icon={faShareSquare} onClick={handleShare} />
						</span>
					</Tooltip>
				)}
			</ButtonRow>

			<Box padding={4}>
				<Typography variant="h4" component="h3" flexGrow={1}>
					{job.jobName}
				</Typography>
				<Stack direction="row" alignItems="baseline" marginBottom={3} flexWrap="wrap">
					{disabledCompanyLink ? (
						<Typography variant="h6" color={theme.palette.primary.main}>
							{job.publisher.name}
						</Typography>
					) : (
						<Link to={router.app().otherProfile({ id: job.publisher.id })}>
							<Typography variant="h6" color={theme.palette.primary.main}>
								{job.publisher.name}
							</Typography>
						</Link>
					)}
					<Typography variant="body1" marginX={1}>
						•
					</Typography>
					<Typography variant="body1">
						{job.publisher.address.street1}
						{job.publisher.address.street2 && ` ${job.publisher.address.street2}`},{' '}
						{job.publisher.address.zip} {job.publisher.address.city}, {job.publisher.address.state}{' '}
						{job.publisher.address.country}
					</Typography>
					<Box flexGrow={1} />
					{!isNaN(job.createdAt.getDate()) && (
						<Typography variant="body1">
							{formatRelative(job.createdAt, new Date(), { locale: de })}
						</Typography>
					)}
				</Stack>
				<InfoContainerGroup
					marginBottom={3}
					items={[
						{
							title: 'Anstellungsart',
							content:
								job.workBasis === 0 ? 'Keine Präferenz' : job.workBasis === 2 ? 'Teilzeit' : 'Vollzeit',
						},
						{
							title: 'Arbeitsbereich',
							content:
								job.workArea === WorkArea.NONE
									? 'Keine Präferenz'
									: job.workArea.substring(0, 1).toUpperCase() + job.workArea.substring(1),
						},
						{
							title: 'Zeitraum',
							content: `${format(job.from, 'EE dd.MM.yyyy', { locale: de })} bis ${format(
								job.to,
								'EE dd.MM.yyyy',
								{ locale: de }
							)}`,
						},
					]}
				/>
				<Typography variant="h5" component="h4" gutterBottom>
					Beschreibung
				</Typography>
				<Typography>{job.jobDescription}</Typography>
				<Typography variant="h5" component="h4" gutterBottom marginTop={4}>
					Qualifikationen
				</Typography>
				<UnorderedList>
					{job.jobQualifications.map((qualification, i) => (
						<Typography key={i} variant="body1" component="li" marginY={1}>
							{qualification}
						</Typography>
					))}
				</UnorderedList>
				<Grid container spacing={2} marginTop={2}>
					{[...job.languages, ...job.skills].map((tag, index) => (
						<Grid key={index} item>
							<TagBox content={tag} />
						</Grid>
					))}
				</Grid>
				{handleRequest && (
					<>
						<Box marginY={3}>
							<Divider />
						</Box>
						<StyledButton fullWidth onClick={handleRequest} disabled={requested}>
							{requested ? 'Job angefragt' : 'Job anfragen'}
						</StyledButton>
					</>
				)}
			</Box>
		</JobDetailsCardRoot>
	);
};

export default JobDetailsCardContent;
