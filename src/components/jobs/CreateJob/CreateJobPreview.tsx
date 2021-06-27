import { UseFormWatch } from 'react-hook-form';
import { Company, CreateJobDto } from 'js-api-client';
import JobDetailsCardContent from 'components/jobs/JobDetailsCard/JobDetailsCardContent';
import React from 'react';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';

interface CreateJobPreviewProps {
	watch: UseFormWatch<CreateJobDto>;
}

const CreateJobPreview: React.FC<CreateJobPreviewProps> = ({ watch }) => {
	const createJobDto = watch();
	const company = useRecoilValue(currentUserState) as Company;

	return (
		<JobDetailsCardContent
			job={{
				...createJobDto,
				jobQualifications: createJobDto.jobQualifications.map((q) => q.replace('- ', '').trim()),
				publisher: company,
				publisherId: '',
				requestedIds: [],
				id: '',
				requestedByStudents: [],
				finalAcceptedId: '',
				active: true,
				createdAt: new Date(),
			}}
			disableSave
			disabledCompanyLink
		/>
	);
};

export default CreateJobPreview;
