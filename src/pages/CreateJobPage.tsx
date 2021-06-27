import { joiResolver } from '@hookform/resolvers/joi';
import Grid from '@material-ui/core/Grid';
import useToast from 'common/useToast';
import AppFrame from 'components/app/AppFrame';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';
import { add } from 'date-fns/esm';
import { Company, CreateJobDto } from 'js-api-client';
import { createJobDtoSchema } from 'models/joiSchemas';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import useCreateJob from 'store/jobs/useCreateJob';
import currentUserState from 'store/user/currentUserState';
import CreateJobForm from 'components/jobs/CreateJob/CreateJobForm';
import CreateJobPreview from 'components/jobs/CreateJob/CreateJobPreview';

const CreateJobPage: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const company = useRecoilValue(currentUserState) as Company;

	const toast = useToast();
	const createJob = useCreateJob();

	const defaultValues = useMemo(
		() => ({
			contactMail: company.email,
			headerImageUrl: company.companyHeaderImageUrl,
			from: new Date(),
			to: add(new Date(), { months: 1 }),
			workArea: WorkArea.NONE.valueOf(),
			workBasis: WorkBasis.NONE.valueOf(),
			jobQualifications: [],
			languages: [],
			skills: [],
		}),
		[company.email, company.companyHeaderImageUrl]
	);

	const { control, handleSubmit, reset, watch } = useForm<CreateJobDto>({
		resolver: joiResolver(createJobDtoSchema),
		defaultValues: defaultValues,
	});

	const onSubmit = (data: CreateJobDto) => {
		reset(defaultValues);
		setLoading(true);
		toast
			.promise(
				createJob!({
					...data,
					jobQualifications: data.jobQualifications.map((q) => q.replace('- ', '').trim()),
				})
			)
			.then(() => reset())
			.catch()
			.finally(() => setLoading(false));
	};

	return (
		<AppFrame>
			<Scrollable>
				<CenterContainer maxWidth="xl">
					<Grid container spacing={4} alignItems={'center'}>
						<Grid item md={6} xs={12}>
							<CreateJobForm handleSubmit={handleSubmit(onSubmit)} control={control} disabled={loading} />
						</Grid>
						<Grid item md={6} xs={12}>
							<CreateJobPreview watch={watch} />
						</Grid>
					</Grid>
				</CenterContainer>
			</Scrollable>
		</AppFrame>
	);
};

export default CreateJobPage;
