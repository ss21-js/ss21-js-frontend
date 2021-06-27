import { Tooltip } from '@material-ui/core';
import StyledIconButton from 'components/app/StyledIconButton';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import useToggleSaveJob from 'store/jobs/useToggleSaveJob';
import { useRecoilValue } from 'recoil';
import jobsSavedQuery from 'store/jobs/jobsSavedQuery';
import useToast from 'common/useToast';

interface JobSaveButtonProps {
	jobId: string;
}

const JobSaveButton: React.FC<JobSaveButtonProps> = ({ jobId }) => {
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const savedJobs = useRecoilValue(jobsSavedQuery);
	const toggleJob = useToggleSaveJob();

	const [isSaved, setIsSaved] = useState((savedJobs?.filter((j) => j.id === jobId)?.length ?? 0) > 0);

	const toggleSave = () => {
		setLoading(true);
		return toast
			.promise(toggleJob!(jobId), {
				success: isSaved ? 'Nicht mehr gespeichert' : 'Gespeichert',
			})
			.then(() => {
				setIsSaved((s) => !s);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Tooltip title={loading ? 'Lädt...' : isSaved ? 'Nicht mehr speichern' : 'Speichern'}>
			<span>
				<StyledIconButton loading={loading} icon={isSaved ? faHeart : faHeartOutline} onClick={toggleSave} />
			</span>
		</Tooltip>
	);
};

const AsyncJobSaveButton: React.FC<JobSaveButtonProps> = (props) => {
	return (
		<React.Suspense fallback={<StyledIconButton loading={true} icon={faSpinner} />}>
			<JobSaveButton {...props} />
		</React.Suspense>
	);
};

export default AsyncJobSaveButton;
