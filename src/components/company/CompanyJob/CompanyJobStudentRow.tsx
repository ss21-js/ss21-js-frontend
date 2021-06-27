import { JobWithCompany, Student } from 'js-api-client';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userProfileByIdQuery from 'store/user/userProfileByIdQuery';
import intersection from 'lodash/intersection';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Skeleton from '@material-ui/core/Skeleton';
import StyledButton from 'components/StyledButton';
import useAcceptStudent from 'store/jobs/useAcceptStudent';
import useToast from 'common/useToast';

interface StudentRowProps {
	job: JobWithCompany;
	studentId: string;
}

const StudentRowSkeleton: React.FC = () => {
	return (
		<TableRow>
			<TableCell>
				<Skeleton variant={'text'} />
			</TableCell>
			<TableCell>
				<Skeleton variant={'text'} />
			</TableCell>
			<TableCell align="right">
				<Skeleton variant={'text'} />
			</TableCell>
		</TableRow>
	);
};

const StudentRow: React.FC<StudentRowProps> = ({ job, studentId }) => {
	const profile = useRecoilValue(userProfileByIdQuery(studentId));
	const student = profile!.data as Student;

	const toast = useToast();
	const accept = useAcceptStudent();
	const [loading, setLoading] = useState(false);
	const [accepted, setAccepted] = useState((job.requestedIds ?? []).filter((j) => j === studentId).length === 1);

	const jobSL = [...job.skills, ...job.languages];
	const studentSL = [...student.skills, ...student.languages];

	const matches = intersection(jobSL, studentSL);
	const match = Math.ceil((matches.length / jobSL.length) * 100);

	const handleAccept = () => {
		setLoading(true);
		toast
			.promise(
				accept!({
					jobId: job.id,
					studentId,
				})
			)
			.then(() => {
				setAccepted(true);
			})
			.finally(() => {
				setLoading(true);
			});
	};

	return (
		<TableRow>
			<TableCell>
				{student.firstName} {student.lastName}
			</TableCell>
			<TableCell>{match}%</TableCell>
			<TableCell align="right">
				<StyledButton onClick={handleAccept} disabled={accepted} loading={loading}>
					{accepted ? 'Angefragt' : 'Annehmen'}
				</StyledButton>
			</TableCell>
		</TableRow>
	);
};

const AsyncStudentRow: React.FC<StudentRowProps> = (props) => {
	return (
		<React.Suspense fallback={<StudentRowSkeleton />}>
			<StudentRow {...props} />
		</React.Suspense>
	);
};

export default AsyncStudentRow;
