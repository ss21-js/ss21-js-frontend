import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import jobByIdQuery from 'store/jobs/jobByIdQuery';
import currentUserTypeState from 'store/user/currentUserTypeState';
import JobDetailsCardRoot from 'components/jobs/JobDetailsCard/JobDetailsCardRoot';
import JobDetailsCardContent from 'components/jobs/JobDetailsCard/JobDetailsCardContent';
import UserType from 'models/userType';
import JobDetailsCardSkeleton from './JobDetailsCardSkeleton';
import useToast from 'common/useToast';
import router from '../../../Router';
import useRequestJob from 'store/jobs/useRequestJob';
import currentUserState from 'store/user/currentUserState';

export interface JobDetailsCardProps {
	jobId: string;
	handleClose?: () => void;
	shrink?: boolean;
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ jobId, handleClose, shrink }) => {
	const job = useRecoilValue(jobByIdQuery(jobId));
	const user = useRecoilValue(currentUserState);
	const userType = useRecoilValue(currentUserTypeState);

	const toast = useToast();
	const requestJob = useRequestJob();

	const [requested, setRequested] = useState((job?.requestedByStudents ?? []).includes(user!.id));

	const handleShare = () => {
		toast.promise(
			navigator.clipboard.writeText(
				`${window.location.protocol}//${window.location.host}${router.app().job({ id: jobId }).$}`
			),
			{
				success: 'Link kopiert',
			}
		);
	};

	const handleRequest = () => {
		toast
			.promise(requestJob!(jobId), {
				success: 'Anfrage verschickt',
			})
			.then(() => {
				setRequested(true);
			});
	};

	if (job === null) {
		return <JobDetailsCardRoot>Job nicht gefunden.</JobDetailsCardRoot>;
	}

	return (
		<JobDetailsCardContent
			job={job}
			handleClose={handleClose}
			disableSave={userType !== UserType.STUDENT}
			handleShare={handleShare}
			shrink={shrink}
			handleRequest={userType === UserType.STUDENT ? handleRequest : undefined}
			requested={requested}
		/>
	);
};

const AsyncJobDetailsCard: React.FC<JobDetailsCardProps> = (props) => {
	return (
		<span>
			<React.Suspense fallback={<JobDetailsCardSkeleton />}>
				<JobDetailsCard {...props} />
			</React.Suspense>
		</span>
	);
};

export default AsyncJobDetailsCard;
