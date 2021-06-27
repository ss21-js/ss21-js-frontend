import React from 'react';
import { useRecoilValue } from 'recoil';
import jobByIdQuery from 'store/jobs/jobByIdQuerty';
import currentUserTypeState from 'store/user/currentUserTypeState';
import JobDetailsCardRoot from 'components/jobs/JobDetailsCard/JobDetailsCardRoot';
import JobDetailsCardContent from 'components/jobs/JobDetailsCard/JobDetailsCardContent';
import UserType from 'models/userType';
import JobDetailsCardSkeleton from './JobDetailsCardSkeleton';
import useToast from 'common/useToast';
import router from '../../../Router';

export interface JobDetailsCardProps {
	jobId: string;
	handleClose?: () => void;
	shrink?: boolean;
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ jobId, handleClose, shrink }) => {
	const job = useRecoilValue(jobByIdQuery(jobId));
	const userType = useRecoilValue(currentUserTypeState);

	const toast = useToast();

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
		/>
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
